import { computed, defineComponent } from 'vue'
import WeatherDetailsItem from './WeatherDetailsItem.js'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditionsIcon from './WeatherConditionsIcon.js'
import WeatherDetails from './WeatherDetails.js'
import WeatherConditions from './WeatherConditions.js'
import UiCard from './UiCard.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    UiCard,
    WeatherConditions,
    WeatherDetails,
    WeatherAlert,
    WeatherConditionsIcon,
    WeatherDetailsItem,
  },

  props: {
    name: {
      type: String,
      required: true,
    },

    current: {
      type: Object,
      required: true,
    },

    alert: {
      type: Object,
      required: false,
    },
  },

  setup(props) {
    const isNight = computed(() => props.current.dt < props.current.sunrise || props.current.dt > props.current.sunset)

    return {
      isNight,
    }
  },

  template: `
    <UiCard :dark="isNight">
      <WeatherAlert v-if="alert" :alert="alert" />
      <div>
        <h2 class="weather-card__name">{{ name }}</h2>
        <div class="weather-card__time">{{ current.dt }}</div>
      </div>
      <WeatherConditions :current="current" />
      <WeatherDetails :current="current" />
    </UiCard>
  `,
})
