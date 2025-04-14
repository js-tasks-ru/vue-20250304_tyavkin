<script setup lang="ts">
import { MeetupsLogoStub as MeetupsLogo } from '@shgk/vue-course-ui'
import MeetupsNav from './MeetupsNav.vue'
</script>

<template>
  <header class="header">
    <MeetupsLogo />
    <MeetupsNav />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-larger);
  padding: var(--spacing-large) 0;
  background-color: var(--color-bg-element);
}
</style>
