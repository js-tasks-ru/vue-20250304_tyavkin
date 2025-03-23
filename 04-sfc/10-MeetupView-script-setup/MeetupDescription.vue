<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="meetup-description">{{ props.description }}</div>
</template>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  margin: var(--spacing-large) 0;
  white-space: pre-wrap;
}
</style>
