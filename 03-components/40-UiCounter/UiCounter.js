import { computed, defineComponent, toRef } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, context) {
    const model = toRef(() => props.count)

    const incrementDisable = computed(() => props.max == model.value)
    const decrementDisable = computed(() => props.min == model.value)

    function increment() {
      context.emit('update:count', model.value + 1)
    }

    function decrement() {
      context.emit('update:count', model.value - 1)
    }

    return {
      model,
      incrementDisable,
      decrementDisable,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton 
        aria-label="Decrement" 
        @click="decrement"
        :disabled="decrementDisable">➖</UiButton>
      <span class="count" data-testid="count">{{ model }}</span>
      <UiButton 
        aria-label="Increment" 
        @click="increment"
        :disabled="incrementDisable">➕</UiButton>
    </div>
  `,
})
