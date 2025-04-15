<script setup lang="ts">
import { UiPageTitle } from '@shgk/vue-course-ui'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="page-auth">
    <UiPageTitle class="page-auth__title">{{ title }}</UiPageTitle>
    <slot />
  </div>
</template>

<style scoped>
.page-auth {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
  padding-inline: var(--spacing-base);
}

.page-auth__title {
  text-align: center;
}
</style>
