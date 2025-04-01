# UiSelect

Решение задачи достаточно простое, но требует понимания `generic` типов.

Чтобы связать тип `modelValue` и `options`, используем `generic` тип `T`, который ограничиваем строками, числами и
`null`.

```html
<script setup lang="ts" generic="T extends string">
defineProps <{
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
```
