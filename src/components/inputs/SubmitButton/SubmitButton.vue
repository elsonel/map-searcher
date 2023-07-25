<template>
  <button class="submit-button">
    <PhMagnifyingGlass :size="24" weight="bold" color="white" />
  </button>
</template>

<script lang="ts" setup>
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
</script>

<style scoped>
.submit-button {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 8px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #00c853;
  border: none;
  cursor: pointer;
  transition: 200ms;
}

.submit-button:hover {
  filter: brightness(120%);
}
</style>
