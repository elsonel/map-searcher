<template>
  <input type="checkbox" v-model="isChecked" @change="handleChange" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  isInitialChecked: {
    type: Boolean,
    default: false
  }
})

const isChecked = ref(props.isInitialChecked)

function handleChange(event: Event) {
  isChecked.value = (event.currentTarget as HTMLInputElement).checked
}

watch(
  () => props.isInitialChecked,
  (newValue) => {
    isChecked.value = newValue
  }
)
</script>
