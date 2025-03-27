import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['removeEmailByName'],

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        v-for="{ email, isMarked } in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        @remove-item="$emit('removeEmailByName', email)"
      />
    </ul>
  `,
})
