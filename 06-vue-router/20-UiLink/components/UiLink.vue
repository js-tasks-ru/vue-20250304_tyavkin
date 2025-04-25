<script setup>
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
</script>

<template>
  <span class="link" tabindex="0">Link</span>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
