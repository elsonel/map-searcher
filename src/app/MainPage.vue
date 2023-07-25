<template>
  <div class="wrapper">
    <div class="table-wrapper"></div>
    <div class="map-wrapper" id="map"></div>
  </div>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { GOOGLE_MAPS_API_KEY } from './utilities/constants.ts'

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly'
})

loader.load().then(async () => {
  const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
  const map = new Map(document.getElementById('map') as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
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
  width: 400px;
  height: 100%;
  background-color: blue;
}
</style>
