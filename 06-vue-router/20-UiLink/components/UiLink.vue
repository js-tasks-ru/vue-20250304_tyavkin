<script setup>
  import { defineProps, computed } from 'vue';

  const props = defineProps({
    to: String || Object,
    href: String});

const isRouterLink = computed(()=> props.href === undefined ? 'RouterLink': 'a')
</script>
\
<template>
  <component :is="isRouterLink" v-bind="props"><slot /></component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
