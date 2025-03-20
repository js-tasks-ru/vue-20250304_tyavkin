import { defineComponent } from 'vue'
import WeatherDetailsItem from './WeatherDetailsItem'

export default defineComponent({
  name: 'WeatherDetails',

  components: {
    WeatherDetailsItem,
  },

  props: {
    details: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="weather-details">
        <WeatherDetailsItem 
            v-for="item in details" 
            :label="item.label"
            :value="item.value"></WeatherDetailsItem>
    </div>
  `,
})
