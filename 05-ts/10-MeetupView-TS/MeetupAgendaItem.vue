<script setup lang="ts">
import type { MeetupAgendaItemDTO } from '@shgk/vue-course-ui'
import { computed } from 'vue'
import { UiIcon } from '@shgk/vue-course-ui'

const props = defineProps<{
  agendaItem: MeetupAgendaItemDTO
}>()

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
} as const

const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
} as const

const icon = computed(() => agendaItemIcons[props.agendaItem.type])
const title = computed(() => agendaItemDefaultTitles[props.agendaItem.type])
</script>

<template>
  <div class="agenda-item">
    <div class="agenda-item__col">
      <UiIcon :icon="icon" />
    </div>
    <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
    <div class="agenda-item__col">
      <h3 class="agenda-item__title">{{ title }}</h3>
      <p v-if="agendaItem.speaker" class="agenda-item__talk">
        <span>{{ agendaItem.speaker }}</span>
        <span class="agenda-item__dot"></span>
        <span class="agenda-item__lang">{{ agendaItem.language }}</span>
      </p>
      <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* _agenda-item.css */
.agenda-item {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-base);
  padding: var(--spacing-large) 0;
}

.agenda-item__col:nth-child(1) {
  flex: 0 0 var(--control-size-small);
}

.agenda-item__col:nth-child(2) {
  width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.agenda-item__col:nth-child(3) {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.agenda-item__title {
  font-weight: bold;
}

.agenda-item__lang {
  font-style: italic;
}

.agenda-item__dot::before {
  content: '•';
  color: var(--grey);
  padding: 0 1ch;
}
</style>
