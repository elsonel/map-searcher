<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <div class="table-header">
        <NavigationButton @click="onNavigateClick" />
        <TextFieldInput />
        <SubmitButton />
      </div>
    </div>
    <div class="map-wrapper" id="map"></div>
  </div>
</template>

<script lang="ts">
import { NavigationButton, TextFieldInput, SubmitButton } from '../components'
import { Loader } from '@googlemaps/js-api-loader'
import { GOOGLE_MAPS_API_KEY } from './utilities/constants'
import { ref } from 'vue'

const currentMap = ref()

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly'
})

const mapOptions = {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8
}

loader
  .load()
  .then((google) => {
    currentMap.value = new google.maps.Map(document.getElementById('map'), mapOptions)
  })
  .catch((e) => {
    // do something
  })

const onNavigateClick = () => {
  if (!currentMap.value) return

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        currentMap.value.setCenter(pos)
      },
      () => {
        // handle error
      }
    )
  } else {
    // Browser doesn't support Geolocation
  }
}

export default {
  methods: {
    onNavigateClick
  },
  components: {
    NavigationButton,
    TextFieldInput,
    SubmitButton
  }
}
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

.table-header {
  width: 100%;
}
</style>
