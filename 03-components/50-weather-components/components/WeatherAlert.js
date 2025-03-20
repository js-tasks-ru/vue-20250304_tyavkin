import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherAlert',

  props: {
    description: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-alert">
        <span class="weather-alert__icon">⚠️</span>
        <span class="weather-alert__description">{{ $props.description }}</span>
    </div>
  `,
})
