import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import UiCounter from '../UiCounter.js'

function mountUiCounter({ count, min, max }: { count: number; min?: number; max?: number }) {
  const wrapper = mount(UiCounter, { props: { count, min, max } })
  const getCount = () => wrapper.find('[data-testid="count"]').text()
  const decrement = wrapper.find('[aria-label="Decrement"]')
  const increment = wrapper.find('[aria-label="Increment"]')
  return {
    wrapper,
    getCount,
    decrement,
    increment,
  }
}

describe('components/UiCounter', () => {
  it('отображает счётчик со значением параметра `count`', () => {
    const { getCount } = mountUiCounter({ count: 3 })
    expect(getCount()).toBe('3')
  })

  it('отображает новое значение счётчика при обновлении параметра `count`', async () => {
    const { wrapper, getCount } = mountUiCounter({ count: 3 })
    // @ts-expect-error props are not defined on development
    await wrapper.setProps({ count: 5 })
    expect(getCount()).toBe('5')
  })

  it('увеличивает счётчик на 1 с событием обновления параметра `count` при нажатии на кнопку увеличения', async () => {
    const { wrapper, increment } = mountUiCounter({ count: 3 })
    await increment.trigger('click')
    expect(wrapper.emitted('update:count')).toBeDefined()
    expect(wrapper.emitted('update:count')).toHaveLength(1)
    expect(wrapper.emitted('update:count')![0]).toEqual([4])
  })

  it('уменьшает счётчик на 1 с событием обновления параметра `count` при нажатии на кнопку уменьшения', async () => {
    const { wrapper, decrement } = mountUiCounter({ count: 3 })
    await decrement.trigger('click')
    expect(wrapper.emitted('update:count')).toBeDefined()
    expect(wrapper.emitted('update:count')).toHaveLength(1)
    expect(wrapper.emitted('update:count')![0]).toEqual([2])
  })

  it('отключает кнопку уменьшения при значении 0', () => {
    const { decrement } = mountUiCounter({ count: 0 })
    expect(decrement.attributes('disabled')).toBeDefined()
  })

  it('отключает кнопку уменьшения при значении 10 и min=10', () => {
    const { decrement } = mountUiCounter({ count: 10, min: 10 })
    expect(decrement.attributes('disabled')).toBeDefined()
  })

  it('отключает кнопку увеличения при значении 10 и max=10', () => {
    const { increment } = mountUiCounter({ count: 10, max: 10 })
    expect(increment.attributes('disabled')).toBeDefined()
  })
})
