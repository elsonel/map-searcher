<template>
  <div class="table-row-wrapper">
    <h4 class="table-row-text"><slot></slot></h4>
    <Checkbox
      v-model="isChecked"
      :binary="true"
      @input="(isChecked) => $emit('onCheckboxClick', isChecked)"
    />
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox'

import { ref, watch } from 'vue'

const props = defineProps({
  isInitialChecked: {
    type: Boolean,
    default: false
  }
})

const isChecked = ref(props.isInitialChecked)

watch(
  () => props.isInitialChecked,
  (newValue) => {
    isChecked.value = newValue
  }
)
</script>

<style scoped>
.table-row-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 20px;
  cursor: pointer;
}

.table-row-text {
  width: 0;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  font-family: var(--font-family);
  color: var(--text-color);
  user-select: none;
}
</style>
