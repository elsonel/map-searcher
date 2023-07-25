<template>
  <input
    class="text-field-input"
    type="text"
    placeholder="Search a location..."
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

<style scoped>
.text-field-input {
  width: 100%;
  height: 48px;

  outline: none;
  border-radius: 8px;
  border: 2px solid lightgrey;
  transition: 200ms;
  font-size: 16px;
  padding: 0px 10px;
}

.text-field-input:focus {
  border: 2px solid #00c853;
}
</style>
