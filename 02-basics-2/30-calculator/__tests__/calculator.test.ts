import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import CounterApp from '@/CalculatorApp.js'

describe('CalculatorApp', () => {
  let wrapper: VueWrapper
  let firstOperand: DOMWrapper<HTMLInputElement>
  let secondOperand: DOMWrapper<HTMLInputElement>
  let operators: Record<string, DOMWrapper<HTMLInputElement>>
  let output: DOMWrapper<HTMLOutputElement>

  beforeEach(() => {
    wrapper = mount(CounterApp)
    firstOperand = wrapper.find('input[aria-label="First operand"]')
    secondOperand = wrapper.find('input[aria-label="Second operand"]')
    operators = {
      sum: wrapper.find('input[type="radio"][name="operator"][value="sum"]'),
      subtract: wrapper.find('input[type="radio"][name="operator"][value="subtract"]'),
      multiply: wrapper.find('input[type="radio"][name="operator"][value="multiply"]'),
      divide: wrapper.find('input[type="radio"][name="operator"][value="divide"]'),
    }
    output = wrapper.find('output')
  })

  it('должно рендерить приложение с 2 полями ввода, 4 операторами и output для результата', () => {
    expect(firstOperand.exists()).toBeTruthy()
    expect(secondOperand.exists()).toBeTruthy()
    expect(operators.sum.exists()).toBeTruthy()
    expect(operators.subtract.exists()).toBeTruthy()
    expect(operators.multiply.exists()).toBeTruthy()
    expect(operators.divide.exists()).toBeTruthy()
    expect(output.exists()).toBeTruthy()
  })

  it('должно выводить результат 2 + 3 = 5', async () => {
    await firstOperand.setValue('2')
    await secondOperand.setValue('3')
    await operators.sum.setValue(true)
    expect(output.text()).toBe('5')
  })

  it('должно выводить результат 2 - 3 = -1', async () => {
    await firstOperand.setValue('2')
    await secondOperand.setValue('3')
    await operators.subtract.setValue(true)
    expect(output.text()).toBe('-1')
  })

  it('должно выводить результат 2 * 3 = 6', async () => {
    await firstOperand.setValue('2')
    await secondOperand.setValue('3')
    await operators.multiply.setValue(true)
    expect(output.text()).toBe('6')
  })

  it('должно выводить результат 10 / 5 = 2', async () => {
    await firstOperand.setValue('10')
    await secondOperand.setValue('5')
    await operators.divide.setValue(true)
    expect(output.text()).toBe('2')
  })
})
