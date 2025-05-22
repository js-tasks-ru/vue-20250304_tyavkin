<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    to: [String, Object],
    href: String});

const isRouterLink = computed(() => props.href ? 'a' : 'RouterLink' )

const linkProps = computed(() => props.href ? { href: props.href } : { to: props.to })
</script>

<template>
  <component :is="isRouterLink" v-bind="linkProps"><slot /></component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
