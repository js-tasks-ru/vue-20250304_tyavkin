import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard.js'
import '../WeatherApp.css'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },

  template: `
    <ul class="weather-list unstyled-list">
        <WeatherCard v-for="item in $props.weatherData" :weather="item"></WeatherCard>
    </ul>
  `,
})
