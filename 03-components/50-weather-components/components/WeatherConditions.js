import { defineComponent, computed } from 'vue'
import { WeatherConditionIcons } from '../weather.service.ts'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    weatherId: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const temperatureInDegrees = computed(() => (props.temperature - 273.15).toFixed(1))

    return {
      temperatureInDegrees,
      weatherConditionIcons: WeatherConditionIcons,
    }
  },

  template: `
    <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="$props.description">{{ weatherConditionIcons[$props.weatherId] }}</div>
        <div class="weather-conditions__temp">{{ temperatureInDegrees }} °C</div>
    </div>
  `,
})
