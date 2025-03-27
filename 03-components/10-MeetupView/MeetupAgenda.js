import { defineComponent } from 'vue'
import MeetupAgendaItem from './MeetupAgendaItem.js'
import './MeetupAgenda.css'

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

  template: `
    <ul class="agenda">
      <li v-for="agendaItem in agenda" :key="agendaItem.id" class="agenda__item">
        <MeetupAgendaItem :agenda-item="agendaItem" />
      </li>
    </ul>
  `,
})
