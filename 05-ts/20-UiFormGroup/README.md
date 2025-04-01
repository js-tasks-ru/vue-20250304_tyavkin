# UiFormGroup

Для описания типа параметров требуется использовать generic в `defineProps`. Все параметры не обязательные и имеют тип
`string`, за исключением двух `boolean`

```ts
const props = defineProps<{
  for?: string
  label?: string
  description?: string
  hint?: string
  showHint?: boolean
  invalid?: boolean
}>()
```

Для описания слотов должен использоваться `defineSlots`. Либо с типом `any/void`, либо `Slots`.

```ts
import type {Slot} from 'vue'

defineSlots<{
  default?: Slot
  label?: Slot
  description?: Slot
}>()
```

Для отображения контента, который может быть определен и параметром и слотом, используйте значение слота по умолчанию
```html
<div class="form-group__description">
  <slot name="description">{{ description }}</slot>
</div>
```

Обратите внимание, что обращаться к параметру `for` в шаблоне напрямую нельзя, так как это зарезервированное слово в
JavaScript. Для обращения к параметру `for` в шаблоне используйте `props.for`.

```html
<label :for="props.for" class="form-group__label">
  <slot name="label">{{ label }}</slot>
</label>
```

Скрывать текст подсказки можно с `<template v-if>` или вычислением.

```html
<div v-if="hint !== undefined" class="form-group__hint" :class="{ 'form-group__hint--invalid': invalid }">
  <template v-if="showHint || invalid">{{ hint }}</template>
</div>
```
