import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherList from './components/WeatherList.js'

import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  setup() {
    const weatherData = getWeatherData()

    return {
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <WeatherList :weatherData></WeatherList>
    </div>
  `,
})
