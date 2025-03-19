# Счётчик

Требуется решить три подзадачи:
1. Хранить значение счётчика в реактивной переменной через функцию `ref`
2. Реализовать обработку кликов по кнопкам через директиву `@click`
3. Отключить кнопки при достижении минимального или максимального значения через директиву привязки `:disabled`

Реализовать обработку клика можно как прямо в шаблоне, так как это простое действие, так и вынести в методы.

## Полное решение

```js
import { defineComponent, ref } from 'vue'
import './CounterApp.css'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const MIN = 0
    const MAX = 5

    const counter = ref(0)

    return {
      counter,
      MIN,
      MAX,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= MIN"
        @click="counter -= 1"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= MAX"
        @click="counter += 1"
      >➕</button>
    </div>
  `,
})
```

Или с методами

```js
import { defineComponent, ref } from 'vue'
import './CounterApp.css'

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
```
