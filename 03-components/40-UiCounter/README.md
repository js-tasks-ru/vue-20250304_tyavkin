# UiCounter

В задаче две подзадачи.

Первая часть - корректно описать пропсы компонента.

```js
props: {
  // Текущее значение счётчика - число
  // Этот параметр обязательный, так как компонент не имеет смысла без него
  count: {
    type: Number,
      required
  :
    true,
  }
,

  // min и max - числа
  // Не обязательные параметры, но со значениями по умолчанию
  min: {
    type: Number,
  default:
    0,
  }
,

  max: {
    type: Number,
  default:
    Infinity,
  }
,
}
,
```

Вторая часть - работа с событием для обновления значения счётчика.

Мы не можем просто присвоить новое значение в параметр `count`. Требуется породить событие, с которым передать новое
значение. В общем случае событие можно назвать как угодно. Но для удобной работы через директиву двустороннего
связывания, требуется иметь событие в формате `update:<prop_name>`. В данном случае - `update:count`.

## Полное решение

```js
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
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="increment">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="count >= max" @click="decrement">➕</UiButton>
    </div>
  `,
})
```
