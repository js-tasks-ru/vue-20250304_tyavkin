<script>
import { defineComponent } from 'vue'
import MeetupAgendaItem from './MeetupAgendaItem.vue'

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
})
</script>

<template>
  <ul class="agenda">
    <li v-for="agendaItem in agenda" :key="agendaItem.id" class="agenda__item">
      <MeetupAgendaItem :agenda-item="agendaItem" />
    </li>
  </ul>
</template>

<style scoped>
/* _agenda.css */
.agenda__item {
  border-block-start: var(--border-width-small) solid var(--grey-3);
}

.agenda__item:first-child {
  border-block-start: none;
}
</style>
