import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiCard',

  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },

  template: `
    <li
      class="weather-card"
      :class="{ 'weather-card--night': dark }"
    >
      <slot />
    </li>
  `,
})
