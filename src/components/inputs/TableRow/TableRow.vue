<template>
  <div>
    <p><slot></slot></p>
    <CheckboxInput :isInitialChecked="props.isInitialChecked" />
  </div>
</template>

<script setup lang="ts">
import CheckboxInput from '../CheckboxInput/CheckboxInput.vue'

const props = defineProps({
  isInitialChecked: {
    type: Boolean,
    default: false
  }
})
</script>
