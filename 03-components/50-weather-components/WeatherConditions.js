import { defineComponent } from 'vue'
import WeatherConditionsIcon from './WeatherConditionsIcon.js'

export default defineComponent({
  name: 'WeatherConditions',

  components: {
    WeatherConditionsIcon,
  },

  props: {
    current: {
      type: Object,
      required: true,
    },
  },

  setup() {
    /**
     * Конвертировать температуру из градусов Кельвинов в градусы Цельсии
     * @param {number} kelvin - Температура в градусах Кельвинах
     * @return {number} Температура в градусах Цельсиях
     */
    function kelvinToCelsius(kelvin) {
      return kelvin - 273.15
    }

    return {
      kelvinToCelsius,
    }
  },

  template: `
    <div class="weather-conditions">
      <WeatherConditionsIcon :weather-condition="current.weather" />
      <div class="weather-conditions__temp">{{ kelvinToCelsius(current.temp).toFixed(1) }} °C</div>
    </div>
  `,
})
