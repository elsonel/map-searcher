<template>
  <div class="wrapper">
    <Toast position="bottom-left" />
    <form class="search-row" @submit.prevent="onSearchSubmit">
      <MenuButton @click="isSidebarOpen = true" />
      <TextFieldInput v-model="searchQuery" />
      <SearchButton />
      <NavigationButton @click="onNavigateHomeClick" />
    </form>
    <div class="map" id="map"></div>
    <Sidebar v-model:visible="isSidebarOpen">
      <template #header><SidebarHeader>Search History</SidebarHeader></template>
      <div class="sidebar-content-wrapper">
        <div class="sidebar-footer">
          <DeleteButton
            @click="deleteSelectedSearchEntries"
            :disabled="searchEntriesSelected.length === 0"
          />
        </div>
        <div class="sidebar-table">
          <DataTable
            v-model:selection="searchEntriesSelected"
            :value="searchEntries"
            dataKey="id"
            tableStyle="width: 100%; table-layout: fixed;"
            paginator
            scrollable
            scrollHeight="flex"
            @row-dblclick="onSearchEntryFocus"
            :rows="NUMBER_OF_ROWS"
            :rowStyle="
              () => {
                return {
                  height: `calc((100dvh - 260px) / ${NUMBER_OF_ROWS})`,
                  cursor: 'pointer',
                  userSelect: 'none'
                }
              }
            "
          >
            <Column selectionMode="multiple" headerStyle="width: 40px;"></Column>
            <Column field="name" header="Name"></Column>
          </DataTable>
        </div>
      </div>
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Sidebar from 'primevue/sidebar'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import {
  NavigationButton,
  TextFieldInput,
  SearchButton,
  SidebarHeader,
  DeleteButton,
  MenuButton
} from '../components'

import { v4 as uuidv4 } from 'uuid'
import { Loader } from '@googlemaps/js-api-loader'
import { getCurrentLocation } from './api/getCurrentLocation'
import { getMapLocation } from './api/getMapLocation'
import {
  GOOGLE_MAPS_API_KEY,
  DEFAULT_MAP_ZOOM,
  DEFAULT_LAT,
  DEFAULT_LNG,
  NUMBER_OF_ROWS,
  markerLabelStyle,
  mockLocations
} from './utilities/constants'
import { isError, addSearchEntry, getFormattedTimeByOffset } from './utilities/helpers'
import type { SearchEntry } from './utilities/types'
import { ref, onBeforeMount } from 'vue'
import { getLocationTimezone } from './api/getLocationTimezone'

const toast = useToast()

const searchEntries = ref<SearchEntry[]>([])
const searchEntriesSelected = ref<SearchEntry[]>([])
const cachedHomeLocation = ref<{ lat: number; lng: number }>()
const searchQuery = ref<string>('')
const isSidebarOpen = ref<boolean>(false)
const currentMap = ref<google.maps.Map>()

// Create a toast popup with the passed error message
const showErrorToast = (error: unknown) => {
  toast.add({
    severity: 'error',
    summary: 'Error Encountered',
    detail: isError(error) ? error.message : 'Unknown error occured',
    life: 3000
  })
}

// Delete selected entries
const deleteSelectedSearchEntries = () => {
  const selectedEntryIds = new Set(searchEntriesSelected.value.map((entry) => entry.id))

  // Remove markers from the map
  searchEntriesSelected.value.forEach((searchEntry) => {
    searchEntry.marker?.setMap(null)
    searchEntry.marker?.setVisible(false)
    searchEntry.marker = null
  })

  // Remove search entries from the table list
  searchEntries.value = searchEntries.value.filter((entry) => !selectedEntryIds.has(entry.id))

  // Reset searchEntriesSelected.value
  searchEntriesSelected.value = []
}

// Double click on an entry row to pan to it in the map
const onSearchEntryFocus = (event: { data: SearchEntry }) => {
  const map = currentMap.value
  if (!map) return
  map.setCenter(event.data.position)
}

// Pan map to current geo location
const onNavigateHomeClick = async () => {
  const map = currentMap.value
  if (!map) return

  if (cachedHomeLocation.value) {
    map.setCenter(cachedHomeLocation.value)
    return
  }

  try {
    const { longitude, latitude } = await getCurrentLocation()
    cachedHomeLocation.value = { lat: latitude, lng: longitude }
    map.setCenter({ lat: latitude, lng: longitude })
  } catch (error) {
    showErrorToast(error)
  }
}

// Create a popup with the location's current timezone and local time
const showTimezonePopup = async (placeId: string, placeName: string, map: google.maps.Map) => {
  try {
    const { utcOffsetMinutes } = await getLocationTimezone(placeId, map)
    const formattedTime = getFormattedTimeByOffset(utcOffsetMinutes)

    toast.add({
      severity: 'success',
      summary: placeName,
      detail: `The current time here is ${formattedTime}`,
      life: 5000
    })
  } catch (error) {
    showErrorToast(error)
  }
}

// Look up location and create marker and search history entry
const onSearchSubmit = async () => {
  const map = currentMap.value
  const query = searchQuery.value
  if (!map || !query) return

  try {
    const { longitude, latitude, name, placeId } = await getMapLocation(query, map)
    const position = { lat: latitude, lng: longitude }

    // center map
    map.setCenter(position)

    // add search entry
    searchEntries.value = addSearchEntry(searchEntries.value, position, () => {
      return {
        id: uuidv4(),
        name: query,
        position: position,
        marker: new google.maps.Marker({
          position: position,
          map: map,
          label: {
            text: name,
            ...markerLabelStyle
          }
        })
      }
    })

    // create timezone popup
    await showTimezonePopup(placeId, name, map)
  } catch (error) {
    showErrorToast(error)
  }
}

// Setup Google maps API
onBeforeMount(() => {
  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places']
  })

  const mapOptions = {
    center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    zoom: DEFAULT_MAP_ZOOM,
    mapId: 'DEMO_MAP_ID'
  }

  loader
    .load()
    .then((google) => {
      const mapElement = document.getElementById('map')
      if (!mapElement) return

      const map = new google.maps.Map(mapElement, mapOptions)
      currentMap.value = map

      // Adding mock data
      searchEntries.value = mockLocations.map((location) => {
        return {
          ...location,
          id: uuidv4(),
          marker: new google.maps.Marker({
            position: location.position,
            map: map,
            label: {
              text: location.name,
              ...markerLabelStyle
            }
          })
        }
      })
    })
    .catch((error) => {
      showErrorToast(error)
    })
})
</script>

<style>
.p-sidebar-header {
  /* Remove header padding */
  padding: 0px !important;
  padding-right: 10px !important;
  background-color: var(--primary-color);
}

.p-sidebar-close {
  /* Change sidebar close button colors */
  flex-shrink: 0;
  color: var(--primary-color-text) !important;
  background-color: transparent !important;
}

.p-sidebar-header .p-sidebar-header-content {
  width: 100%;
}

.p-sidebar-header + .p-sidebar-content {
  /* Remove sidebar content padding */
  padding: 0px !important;
}

.p-datatable .p-datatable-tbody > tr > td {
  /* Handling for when table cell text overflows */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.wrapper {
  width: 100%;
  height: 100dvh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
}

.map {
  flex-grow: 1;
}

.search-row {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 10px;

  border-bottom: 1px solid var(--surface-d);
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-content-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.sidebar-table {
  width: 100%;
  height: 0px;
  flex-grow: 1;
}

.sidebar-footer {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}
</style>
