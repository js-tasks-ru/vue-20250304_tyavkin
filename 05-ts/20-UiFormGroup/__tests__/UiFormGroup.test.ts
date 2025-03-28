import fs from 'node:fs/promises'
import type { Component } from 'vue'
import { assert, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ESLint } from 'eslint'
import UiFormGroup from '@/UiFormGroup.vue'

async function readComponentSource(component: Component) {
  if (!('__file' in component) || !component.__file) {
    throw new Error(`Компонент должен быть описан на <script setup>`)
  }

  return fs.readFile(component.__file, 'utf8')
}

async function lintComponentDefinePropsDeclaration(component: Component) {
  if (!('__file' in component) || !component.__file) {
    throw new Error(`Компонент должен быть описан на <script setup>`)
  }

  const eslint = new ESLint({
    overrideConfig: {
      rules: {
        'vue/define-props-declaration': ['error', 'type-based'],
        'vue/block-lang': [
          'error',
          {
            script: {
              lang: 'ts',
            },
          },
        ],
      },
    },
  })

  const result = await eslint.lintFiles([component.__file])
  return {
    success: result[0].errorCount === 0,
    message: result[0].messages[0]?.message,
  }
}

function mountUiFormGroup(props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const wrapper = shallowMount(UiFormGroup, {
    props: {
      for: 'test-id',
      ...props,
    },
    slots: {
      default: '<input id="test-id" type="text" />',
      ...slots,
    },
    attachTo: document.body,
  })
  const label = wrapper.find('label')
  const description = wrapper.find('.form-group__description')
  const defaultSlot = wrapper.find('.form-group__control')
  const hint = wrapper.find('.form-group__hint')
  return { wrapper, label, description, defaultSlot, hint }
}

describe('ts/UiFormGroup', () => {
  describe('UiFormGroup', () => {
    describe('Типизация', () => {
      it('UiFormGroup должен быть описан через TS с defineProps<...>()', async () => {
        const { success, message } = await lintComponentDefinePropsDeclaration(UiFormGroup)
        assert(success, message)
      })

      it('UiFormGroup должен описывать все слоты в defineSlots', async () => {
        const source = await readComponentSource(UiFormGroup)
        expect(source).toMatch(/defineSlots<.*>/ms)
      })
    })

    describe('Использование', () => {
      it('UiFormGroup должен рендерить label с for из параметра for и текстом из параметра label', () => {
        const { label } = mountUiFormGroup({ label: 'Label' })
        expect(label.exists()).toBeTruthy()
        expect(label.attributes('for')).toBe('test-id')
        expect(label.text()).toBe('Label')
      })

      it('UiFormGroup должен рендерить .form-group__description с текстом из параметра description', () => {
        const { description } = mountUiFormGroup({ description: 'Description' })
        expect(description.exists()).toBeTruthy()
        expect(description.text()).toBe('Description')
      })

      it('UiFormGroup должен рендерить контент в элементе .form-group__control', () => {
        const { defaultSlot } = mountUiFormGroup({})
        expect(defaultSlot.exists()).toBeTruthy()
        expect(defaultSlot.find('input').exists()).toBeTruthy()
      })

      it('UiFormGroup не должен рендерить блок подсказки .form-group__hint, если hint не определён', () => {
        const { hint } = mountUiFormGroup({ hint: undefined })
        expect(hint.exists()).toBeFalsy()
      })

      it('UiFormGroup должен рендерить блок .form-group__hint при наличии подсказки', () => {
        const { hint } = mountUiFormGroup({ hint: 'Hint' })
        expect(hint.exists()).toBeTruthy()
      })

      it('UiFormGroup не должен рендерить текст подсказки по умолчанию', () => {
        const { hint } = mountUiFormGroup({ hint: 'Hint' })
        expect(hint.text().trim()).toBe('')
      })

      it('UiFormGroup должен рендерить текст подсказки с параметром showHint', () => {
        const { hint } = mountUiFormGroup({ hint: 'Hint', showHint: true })
        expect(hint.text()).toBe('Hint')
      })

      it('UiFormGroup должен рендерить .form-group__hint без класса .form-group__hint--invalid по умолчанию', () => {
        const { hint } = mountUiFormGroup({ hint: 'Hint', showHint: true })
        expect(hint.classes('form-group__hint--invalid')).toBeFalsy()
      })

      it('UiFormGroup должен рендерить .form-group__hint с классом .form-group__hint--invalid с параметром invalid', () => {
        const { hint } = mountUiFormGroup({ hint: 'Hint', invalid: true })
        expect(hint.classes('form-group__hint--invalid')).toBeTruthy()
      })

      it('UiFormGroup должен рендерить текст подсказки с параметром invalid', () => {
        const { hint } = mountUiFormGroup({ hint: 'Hint', invalid: true })
        expect(hint.text()).toBe('Hint')
      })

      it('UiFormGroup должен рендерить кастомный контент слота label', () => {
        const { label } = mountUiFormGroup({ label: 'label text from prop' }, { label: 'Custom label' })
        expect(label.text()).toBe('Custom label')
      })

      it('UiFormGroup должен рендерить кастомный контент слота description', () => {
        const { description } = mountUiFormGroup(
          { description: 'description text from prop' },
          { description: 'Custom description' },
        )
        expect(description.text()).toBe('Custom description')
      })
    })
  })
})
