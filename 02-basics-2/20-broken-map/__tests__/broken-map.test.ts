import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MapApp from '../MapApp.js'
import { nextTick } from 'vue'

describe('MapApp', () => {
  it('должен устанавливать style свойства left и top у метки .pin в соответствии с offsetX и offsetY клика по карте', async () => {
    const wrapper = mount(MapApp, { attachTo: document.body })
    await wrapper.trigger('click', { offsetX: 42, offsetY: 24 })
    const pin = wrapper.find<HTMLElement>('.pin')
    expect(pin.element.style.left).toMatch('42px')
    expect(pin.element.style.top).toMatch('24px')
  })

  it('должен использовать Vue подходы', async () => {
    const wrapper = mount(MapApp, { attachTo: document.body })
    await wrapper.trigger('click', { offsetX: 42, offsetY: 24 })
    // Упс, компонент ре-рендерится
    wrapper.vm.$forceUpdate()
    await nextTick()
    const pin = wrapper.find<HTMLElement>('.pin')
    expect(pin.element.style.left).toMatch('42px')
    expect(pin.element.style.top).toMatch('24px')
  })
})
