# UiLink

Требуется описать компонент с двумя необязательными параметрами и вычисляемым свойством, определяющим тип компонента.
Оба параметра привязать к компоненту. А также добавить слот для контента.

```ts
// <script setup lang="ts">
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
```

```js
// <script setup>
import { computed } from 'vue'

const props = defineProps({
  href: String,
  to: [String, Object],
})

const tag = computed(() => (props.to ? 'RouterLink' : 'a'))
```

```html
<template>
  <component :is="tag" class="link" :to :href tabindex="0">
    <slot />
  </component>
</template>
```
