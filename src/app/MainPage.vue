<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <div class="table-header">
        <NavigationButton @click="onNavigateHomeClick" />
        <form class="table-header-form" @submit.prevent="onSearchSubmit">
          <TextFieldInput @input="onSearchInput" />
          <SubmitButton />
        </form>
      </div>
    </div>
    <div class="map-wrapper" id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { getCurrentLocation } from './api/getCurrentLocation'
import { getMapLocation } from './api/getMapLocation'
import { NavigationButton, TextFieldInput, SubmitButton } from '../components'
import {
  GOOGLE_MAPS_API_KEY,
  DEFAULT_MAP_ZOOM,
  DEFAULT_LAT,
  DEFAULT_LNG
} from './utilities/constants'
import { ref, onBeforeMount } from 'vue'

const cachedHomeLocation = ref()
const currentMap = ref()
const searchQuery = ref('')

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
    // Should show an error toast here instead of logging
    console.error(error)
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
    // Should show an error toast here instead of logging
    console.error(error)
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
      // Should show an error toast here instead of logging
      console.error(error)
    })
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100dvh;
  display: flex;
}

.map-wrapper {
  flex-grow: 1;
  height: 100%;
  background-color: red;
}

.table-wrapper {
  width: 320px;
  height: 100%;
}

.table-header {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;

  display: flex;
  gap: 10px;
}

.table-header-form {
  flex-grow: 1;
  display: flex;
  gap: 10px;
}
</style>
