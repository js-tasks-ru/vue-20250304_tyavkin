import { computed, defineComponent } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherConditionsIcon',

  props: {
    weatherCondition: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const icon = computed(() => WeatherConditionIcons[props.weatherCondition.id])
    return {
      icon,
    }
  },

  template: `
    <div class="weather-conditions__icon" :title="weatherCondition.description">
      {{ icon }}
    </div>
  `,
})
