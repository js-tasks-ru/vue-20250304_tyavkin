import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
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
