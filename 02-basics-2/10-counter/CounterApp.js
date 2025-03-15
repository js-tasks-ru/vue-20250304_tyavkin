import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    function decrement() {
      count.value--
    }

    const incrementDisabled = computed(() => {
      return count.value === 5
    })

    const decrementDisabled = computed(() => {
      return count.value === 0
    })

    return {
      count,
      incrementDisabled,
      decrementDisabled,
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
        :disabled="decrementDisabled"
        @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="incrementDisabled"
        @click="increment"
      >➕</button>
    </div>
  `,
})
