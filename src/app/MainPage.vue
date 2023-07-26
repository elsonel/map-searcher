<template>
  <div class="wrapper">
    <Toast />
    <form class="search-row" @submit.prevent="onSearchSubmit">
      <NavigationButton @click="onNavigateHomeClick" />
      <TextFieldInput @input="onSearchInput" />
      <SearchButton />
    </form>
    <div class="map-wrapper" id="map"></div>
    <Sidebar v-model:visible="isSidebarOpen">
      <template #header><SidebarHeader>Search History</SidebarHeader></template>
      <div class="sidebar-content-wrapper">
        <div class="sidebar-table-wrapper">
          <DataTable
            :value="searchHistory"
            paginator
            paginatorPosition="top"
            :tableStyle="{ width: '100%' }"
            :rows="10"
          >
            <Column field="name" header="Name">
              <template #body="slotProps">
                <div>slotProps.data.image</div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="sidebar-footer"><DeleteButton /></div>
      </div>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="isSidebarOpen = true" />
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { Loader } from '@googlemaps/js-api-loader'
import { getCurrentLocation } from './api/getCurrentLocation'
import { getMapLocation } from './api/getMapLocation'
import {
  NavigationButton,
  TextFieldInput,
  SearchButton,
  SidebarHeader,
  DeleteButton
} from '../components'
import {
  GOOGLE_MAPS_API_KEY,
  DEFAULT_MAP_ZOOM,
  DEFAULT_LAT,
  DEFAULT_LNG
} from './utilities/constants'
import { isError } from './utilities/helpers'
import { ref, onBeforeMount } from 'vue'

const toast = useToast()

const searchHistory = ref([
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  },
  {
    name: 'abc'
  }
])
const isSidebarOpen = ref(true)

const cachedHomeLocation = ref()
const currentMap = ref()
const searchQuery = ref('')

const showErrorToast = (error: unknown) => {
  toast.add({
    severity: 'error',
    summary: 'Error Encountered',
    detail: isError(error) ? error.message : 'Unknown error occured',
    life: 3000
  })
}

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

const onSearchInput = (e: Event) => {
  const value = (e.currentTarget as HTMLInputElement).value
  searchQuery.value = value
}

const onSearchSubmit = async () => {
  const map = currentMap.value
  const query = searchQuery.value
  if (!map || !query) return

  try {
    const { longitude, latitude, name } = await getMapLocation(searchQuery.value, map)
    const position = { lat: latitude, lng: longitude }

    map.setCenter(position)

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      label: {
        text: name,
        color: '#000',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    })
  } catch (error) {
    showErrorToast(error)
  }
}

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

      currentMap.value = new google.maps.Map(mapElement, mapOptions)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<style>
.p-sidebar-header {
  padding: 0px !important;
  padding-right: 10px !important;
  background-color: var(--primary-color);
}

.p-sidebar-close {
  flex-shrink: 0;
  color: var(--primary-color-text) !important;
  background-color: transparent !important;
}

.p-sidebar-header .p-sidebar-header-content {
  width: 100%;
}

.p-sidebar .p-sidebar-header + .p-sidebar-content {
  padding: 0px;
}

.p-paginator {
  background-color: var(--surface-b) !important;
  border-bottom: 1px solid var(--surface-c) !important;
}

.wrapper {
  width: 100%;
  height: 100dvh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
}

.map-wrapper {
  flex-grow: 1;
}

.search-row {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 10px;

  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-content-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.sidebar-table-wrapper {
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
