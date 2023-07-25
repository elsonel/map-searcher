<template>
  <button class="navigation-button" type="button">
    <PhNavigationArrow weight="fill" :size="24" color="white" />
  </button>
</template>

<script lang="ts" setup>
import { PhNavigationArrow } from '@phosphor-icons/vue'
</script>

<style scoped>
.navigation-button {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: calc(infinity * 1px);

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #2a56c6;
  border: none;
  cursor: pointer;
  transition: 200ms;
}

.navigation-button:hover {
  filter: brightness(120%);
}
</style>
