import { defineComponent } from 'vue'
import './MeetupDescription.css'

export default defineComponent({
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
    },
  },

  template: `
    <div class="meetup-description">{{ description }}</div>
  `,
})
