<template>
  <input
    type="text"
    placeholder="Search for a location..."
    v-model="currentValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  initialValue: {
    type: String,
    default: ''
  }
})

const currentValue = ref(props.initialValue)

function handleInput(event: Event) {
  currentValue.value = (event.currentTarget as HTMLInputElement).value
}

watch(
  () => props.initialValue,
  (newValue) => {
    currentValue.value = newValue
  }
)
</script>
