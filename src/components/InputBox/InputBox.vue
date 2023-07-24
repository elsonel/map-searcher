<template>
  <input type="text" v-model="currentValue" @input="handleInput" placeholder="Search..." />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentValue = ref('')

function handleInput(event: Event) {
  currentValue.value = (event.target as HTMLInputElement).value
}
</script>
