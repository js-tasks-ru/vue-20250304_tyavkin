<script setup lang="ts" generic="T extends string">
defineProps<{
  options: {
    value: T
    text: string
  }[]
}>()

const model = defineModel<T>()
</script>

<template>
  <select v-model="model" class="select">
    <option v-for="{ value, text } in options" :key="value" :value>
      {{ text }}
    </option>
  </select>
</template>

<style scoped>
.select {
  display: block;
  border: var(--border-width) solid var(--color-primary);
  border-radius: var(--border-radius);
  padding-block: 0;
  padding-inline-start: var(--spacing-base);
  padding-inline-end: calc(var(--spacing-base) * 2 + 24px);
  height: var(--control-size);
  font-weight: 500;
  font-size: var(--font-size-control);
  font-family: inherit;
  line-height: var(--line-height);
  outline: none;
  appearance: none;
  background-color: var(--background-element);
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="%23B0BEDE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-position: right var(--spacing-base) center;
  background-repeat: no-repeat;

  &:focus {
    border-color: var(--color-primary-dark);
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 15L12 9L18 15" stroke="%23B0BEDE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  }

  &:hover {
    border-color: var(--color-primary-light);
  }

  &:disabled {
    border-color: var(--color-primary-light);
    background-color: var(--color-dimmed-light);
  }
}

[dir='rtl'] .select {
  background-position: left var(--spacing-base) center;
}
</style>
