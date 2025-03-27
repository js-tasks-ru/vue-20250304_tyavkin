<script setup>
import { computed, ref } from 'vue'
import { UiRadioGroup } from '@shgk/vue-course-ui'
import MeetupView from './MeetupView.vue'
import meetups from './meetups.fixture.ts'

const meetupIndex = ref(0)
const meetup = computed(() => meetups[meetupIndex.value])
const options = meetups.map((_, index) => ({ label: index + 1, value: index }))
</script>

<template>
  <div style="display: flex; justify-content: center; gap: 1em; padding: 1em 0">
    <UiRadioGroup v-model="meetupIndex" :options="options" />
  </div>
  <div class="page-meetup">
    <MeetupView :meetup="meetup" />
  </div>
</template>
