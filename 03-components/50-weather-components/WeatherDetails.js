import { defineComponent } from 'vue'
import WeatherDetailsItem from './WeatherDetailsItem.js'

export default defineComponent({
  name: 'WeatherDetails',

  components: {
    WeatherDetailsItem,
  },

  props: {
    current: {
      type: Object,
      required: true,
    },
  },

  setup() {
    /**
     * Конвертировать давление из гектопаскалей в мм рт. ст.
     * @param {number} hPa - Давление в гектопаскалях
     * @return {number} Давление в мм рт. ст.
     */
    function hPaToMmHg(hPa) {
      return hPa * 0.75
    }

    return {
      hPaToMmHg,
    }
  },

  template: `
    <div class="weather-details">
      <WeatherDetailsItem label="Давление, мм рт. ст." :value="hPaToMmHg(current.pressure).toFixed(0)" />
      <WeatherDetailsItem label="Влажность, %" :value="current.humidity" />
      <WeatherDetailsItem label="Облачность, %" :value="current.clouds" />
      <WeatherDetailsItem label="Ветер, м/с" :value="current.wind_speed" />
    </div>
  `,
})
