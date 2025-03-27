import { defineComponent, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherList from './WeatherList.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  setup() {
    const weatherData = ref(getWeatherData())

    return {
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <WeatherList :weather-data="weatherData" />
    </div>
  `,
})
