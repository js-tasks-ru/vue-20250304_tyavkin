import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operator = ref('sum')
    const firstOperand = ref(0)
    const secondOperand = ref(0)

    const disableDivideByZero = computed(() => {
      return secondOperand.value === 0
    })

    const result = computed(() => {
      if (secondOperand.value === 0) {
        return 0
      }

      switch (operator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value
        case 'subtract':
          return firstOperand.value - secondOperand.value
        case 'multiply':
          return firstOperand.value * secondOperand.value
        default:
          return firstOperand.value / secondOperand.value
      }
    })

    return {
      operator,
      firstOperand,
      secondOperand,
      disableDivideByZero,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" 
      v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator" :disabled="disableDivideByZero"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" 
      v-model="secondOperand"/>

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
