import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetailsItem',

  props: {
    label: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number],
      required: true,
    },
  },

  template: `
    <div class="weather-details__item">
      <span class="weather-details__item-label">{{ label }}</span>
      <span class="weather-details__item-value">{{ value }}</span>
    </div>
  `,
})
