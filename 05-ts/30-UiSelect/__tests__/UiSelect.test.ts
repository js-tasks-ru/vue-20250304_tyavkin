import fs from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import UiSelect from '@/UiSelect.vue'

async function readComponentSource(component: object) {
  if (!('__file' in component) || !component.__file) {
    throw new Error(`Компонент должен быть описан на <script setup>`)
  }

  return fs.readFile(component.__file, 'utf8')
}

const options = [
  { value: '', text: 'Select an option' },
  { value: '1', text: 'One' },
  { value: '2', text: 'Two' },
  { value: '3', text: 'Three' },
]

describe('ts/UiSelect', () => {
  describe('UiSelect', () => {
    it('UiSelect должен рендерить select со списком вариантов из options', () => {
      const wrapper = shallowMount(UiSelect, { props: { modelValue: '', options } })
      const select = wrapper.find('select')
      const optionElements = wrapper.findAll('option')
      expect(select.exists()).toBe(true)
      expect(optionElements).toHaveLength(options.length)
      for (let i = 0; i < options.length; i++) {
        expect(optionElements[i].text()).toBe(options[i].text)
        expect(optionElements[i].element.value).toBe(options[i].value)
      }
    })

    it('UiSelect должен рендерить select со значением модели', () => {
      const wrapper = shallowMount(UiSelect, { props: { modelValue: '1', options } })
      const select = wrapper.find('select')
      expect(select.element.value).toBe('1')
    })

    it('UiSelect должен обновлять значение модели при выборе нового значения', async () => {
      const wrapper = shallowMount(UiSelect, { props: { modelValue: '', options } })
      const select = wrapper.find('select')
      await select.setValue('2')
      expect(wrapper.emitted('update:modelValue')).toEqual([['2']])
    })

    it('UiSelect должен быть описан как generic компонент', async () => {
      const source = await readComponentSource(UiSelect)
      expect(source).toMatch(/<script.*generic.*>/ms)
    })
  })
})
