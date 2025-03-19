# Калькулятор

Состояние приложения — это два операнда (два числа) и текущая операция. Значит, нам требуется как минимум три реактивные
переменные.

```js
const a = ref(0)
const b = ref(0)
const operator = ref('sum')
```

Все эти переменные требуется привязать к элементам формы директивой двустороннего связывания `v-model`. Обратите
внимание, что нужно именно двустороннее связывание.

```html
<input v-model="a" type="number" aria-label="First operand"/>
```

Может быть три подхода к вычислению результата:

1. Явно хранить результат в новой реактивной переменной и вычислять:
   1. По событию на элементе формы, например, используя `@input` или `@change`
   2. Отслеживая изменения через `watch`
2. Как вычисляемое свойство `computed`

Самый правильный вариант - последний. Он позволит явно описать результат - как результат вычисления от введённых чисел и
оператора. При этом будет обновляться автоматически и не будет привязан к конкретным элементам на странице.

```js
// Пример с простой реализацией на 4 if
const result = computed(() => {
  if (operator.value === 'sum') {
    return a.value + b.value
  }
  if (operator.value === 'subtract') {
    return a.value - b.value
  }
  if (operator.value === 'multiply') {
    return a.value * b.value
  }
  if (operator.value === 'divide') {
    return a.value / b.value
  }
  return undefined
})
```

## Полное решение (вариант 1)

```js
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup () {
    const a = ref(0)
    const b = ref(0)
    const operator = ref('sum')

    const result = computed(() => {
      if (operator.value === 'sum') {
        return a.value + b.value
      }
      if (operator.value === 'subtract') {
        return a.value - b.value
      }
      if (operator.value === 'multiply') {
        return a.value * b.value
      }
      if (operator.value === 'divide') {
        return a.value / b.value
      }
      return undefined
    })

    return {
      a,
      b,
      operator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="a" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
        <label><input v-model="operator" type="radio" name="operator" value="subtract"/>➖</label>
        <label><input v-model="operator" type="radio" name="operator" value="multiply"/>✖</label>
        <label><input v-model="operator" type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" v-model="b" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
```

Решение можно немного улучшить, если также в данных описать набор всех возможных операций. Опишем две вспомогательные не
реактивные переменные:

```js
const operations = [
  {
    operator: 'sum',
    label: '➕',
  },
  {
    operator: 'subtract',
    label: '➖',
  },
  {
    operator: 'multiply',
    label: '✖',
  },
  {
    operator: 'divide',
    label: '➗',
  },
]

const calculations = {
  sum: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
}
```

Тогда можно упростить и вычисление, и вывод в шаблоне.

## Полное решение (вариант 2)

```js
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup () {
    const a = ref(0)
    const b = ref(0)
    const operator = ref('sum')
    const operations = [
      {
        operator: 'sum',
        label: '➕',
      },
      {
        operator: 'subtract',
        label: '➖',
      },
      {
        operator: 'multiply',
        label: '✖',
      },
      {
        operator: 'divide',
        label: '➗',
      },
    ]

    const calculations = {
      sum: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => a / b,
    }

    const result = computed(() => calculations[operator.value]?.(a.value, b.value))

    return {
      a,
      b,
      operator,
      result,
      operations,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="a" aria-label="First operand" />

      <div class="calculator__operators">
        <label v-for="operation in operations">
          <input v-model="operator" type="radio" name="operator" :value="operation.operator"/>
          {{ operation.label }}
        </label>
      </div>

      <input type="number" v-model="b" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
```
