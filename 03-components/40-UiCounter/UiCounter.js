import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    // Текущее значение счётчика - число
    // Этот параметр обязательный, так как компонент не имеет смысла без него
    count: {
      type: Number,
      required: true,
    },

    // min и max - числа
    // Не обязательные параметры, но со значениями по умолчанию
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

  setup(props, { emit }) {
    function increment() {
      emit('update:count', props.count + 1)
    }

    function decrement() {
      emit('update:count', props.count - 1)
    }

    return {
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="count >= max" @click="increment">➕</UiButton>
    </div>
  `,
})
