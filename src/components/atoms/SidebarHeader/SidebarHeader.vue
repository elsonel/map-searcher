<template>
  <div class="sidebar-header-wrapper">
    <h2 class="sidebar-header-text"><slot></slot></h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar-header-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-header-text {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--primary-color-text);
}
</style>
