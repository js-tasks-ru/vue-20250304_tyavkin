import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {},

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum"/>➕</label>
        <label><input type="radio" name="operator" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" />

      <div>=</div>

      <output>0</output>
    </div>
  `,
})
