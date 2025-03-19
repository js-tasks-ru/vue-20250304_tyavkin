import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const MIN = 0
    const MAX = 5

    const counter = ref(0)

    const increment = () => (counter.value += 1)
    const decrement = () => (counter.value -= 1)

    return {
      counter,
      MIN,
      MAX,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= MIN"
        @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= MAX"
        @click="increment"
      >➕</button>
    </div>
  `,
})
