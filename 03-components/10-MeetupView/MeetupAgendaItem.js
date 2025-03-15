import { computed, defineComponent } from 'vue'
import { UiIcon } from '@shgk/vue-course-ui'
import './MeetupAgendaItem.css'

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
}

const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
}

export default defineComponent({
  name: 'MeetupAgendaItem',

  components: {
    UiIcon,
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const icon = computed(() => agendaItemIcons[props.agendaItem.type])
    const title = computed(() => agendaItemDefaultTitles[props.agendaItem.type])
    return {
      icon,
      title,
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <UiIcon :icon="icon"/>
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <div class="agenda-item__title">{{ title }}</div>
        <div v-if="agendaItem.speaker" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </div>
        <div v-if="agendaItem.description">{{ agendaItem.description }}</div>
      </div>
    </div>
  `,
})
