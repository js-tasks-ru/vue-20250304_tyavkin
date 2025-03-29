<script setup lang="ts">
import { computed, type Slot } from 'vue'

const props = defineProps<{
  for?: string
  label?: string
  description?: string
  hint?: string
  showHint?: boolean
  invalid?: boolean
}>()

const slots = defineSlots<{
  default?: Slot
  label?: Slot
  description?: Slot
}>()

const showHintOrError = computed(
  () => (props.showHint != undefined && props.showHint) || (props.invalid != undefined && props.invalid),
)
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label :for="$props.for" class="form-group__label">
        <slot v-if="slots.label !== undefined" name="label" />
        <template v-else>
          {{ label }}
        </template>
      </label>
      <div class="form-group__description">
        <slot v-if="slots.description !== undefined" name="description" />
        <template v-else>
          {{ description }}
        </template>
      </div>
    </div>
    <div class="form-group__control">
      <slot />
    </div>
    <div v-if="hint !== undefined" class="form-group__hint" :class="{ 'form-group__hint--invalid': invalid == true }">
      <template v-if="showHintOrError">
        {{ hint }}
      </template>
    </div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
