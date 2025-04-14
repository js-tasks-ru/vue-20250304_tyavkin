<script setup lang="ts">
import type { Slot } from 'vue'
import { UiFlex } from '@shgk/vue-course-ui'

const emit = defineEmits<{
  submit: [event: SubmitEvent]
}>()

defineSlots<{
  default?: Slot
  submit?: Slot
  append?: Slot
}>()
</script>

<template>
  <UiFlex tag="form" gap="large" column @submit.prevent="emit('submit', $event as SubmitEvent)">
    <UiFlex column>
      <slot />
    </UiFlex>

    <div class="auth-form__submit">
      <slot name="submit" />
    </div>

    <div class="auth-form__append">
      <slot name="append" />
    </div>
  </UiFlex>
</template>

<style scoped>
.auth-form__submit {
  padding-inline: var(--spacing-large);
}

.auth-form__append {
  align-self: center;
}
</style>
