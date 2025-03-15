import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  setup() {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" disabled>➖</UiButton>
      <span class="count" data-testid="count">3</span>
      <UiButton aria-label="Increment">➕</UiButton>
    </div>
  `,
})
