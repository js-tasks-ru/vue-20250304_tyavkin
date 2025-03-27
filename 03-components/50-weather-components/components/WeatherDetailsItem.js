import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetailsItem',

  props: {
    label: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },
  },

  template: `
    <div class="weather-details__item">
      <div class="weather-details__item-label">{{ label }}</div>
      <div class="weather-details__item-value">{{ value }}</div>
    </div>
  `,
})
