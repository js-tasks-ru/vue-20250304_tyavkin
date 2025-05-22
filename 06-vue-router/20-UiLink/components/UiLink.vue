<script setup lang="ts">
import type { Slot } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  href?: string
  to?: RouteLocationRaw
}>()

defineSlots<{
  default?: Slot
}>()

const tag = computed(() => (props.to ? 'RouterLink' : 'a'))
</script>

<template>
  <component :is="tag" class="link" :to :href tabindex="0">
    <slot />
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
