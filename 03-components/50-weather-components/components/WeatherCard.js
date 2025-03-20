import { computed, defineComponent } from 'vue'
import WeatherDetails from './WeatherDetails.js'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditions from './WeatherConditions.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherDetails,
    WeatherAlert,
    WeatherConditions,
  },

  props: {
    weather: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const alertDescription = props.weather.alert
      ? props.weather.alert.sender_name + ': ' + props.weather.alert.description
      : ''

    const isWeatherCardNight = computed(
      () =>
        props.weather.current.dt >= props.weather.current.sunset ||
        props.weather.current.dt <= props.weather.current.sunrise,
    )

    const details = computed(() => [
      {
        label: 'Давление, мм рт. ст.',
        value: Math.round(props.weather.current.pressure * 0.75),
      },
      {
        label: 'Влажность, %',
        value: props.weather.current.humidity,
      },
      {
        label: 'Облачность, %',
        value: props.weather.current.clouds,
      },
      {
        label: 'Ветер, м/с',
        value: props.weather.current.wind_speed,
      },
    ])

    return {
      alertDescription,
      isWeatherCardNight,
      details,
    }
  },

  template: `
    <li class="weather-card"
      :class="{'weather-card--night': isWeatherCardNight}">
      <WeatherAlert 
        v-if="$props.weather.alert" 
        :description="alertDescription"
        ></WeatherAlert>
      <div>
        <h2 class="weather-card__name">
          {{ $props.weather.geographic_name}}
        </h2>
        <div class="weather-card__time">
          {{ $props.weather.current.dt }}
        </div>
      </div>
      <WeatherConditions
        :weatherId="$props.weather.current.weather.id"
        :description="$props.weather.current.weather.description"
        :temperature="$props.weather.current.temp"></WeatherConditions>
      <WeatherDetails :details/>
    </li>
  `,
})
