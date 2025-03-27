import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard.js'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    weatherData: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="weather-list unstyled-list">
      <WeatherCard
        v-for="weatherData in weatherData"
        :key="weatherData.id"
        :name="weatherData.geographic_name"
        :current="weatherData.current"
        :alert="weatherData.alert"
      />
    </ul>
  `,
})
