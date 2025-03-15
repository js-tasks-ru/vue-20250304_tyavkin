import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import UiClock from '@/UiClock.js'

describe('components/UiClock', () => {
  let wrapper: VueWrapper
  let time: Date

  beforeEach(() => {
    vi.useFakeTimers()
    time = new Date('2024-01-02T03:04:05.006Z')
    vi.setSystemTime(time)
    wrapper = mount(UiClock)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("отображает текущее время локализовано с timeStyle: 'medium'", () => {
    const formattedTime = time.toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    expect(wrapper.text()).toBe(formattedTime)
  })

  it('отображает актуальное время через 5 секунд', async () => {
    vi.advanceTimersByTime(5 * 1000)
    await nextTick()
    const formattedTime = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    expect(wrapper.text()).toBe(formattedTime)
  })

  it('отображает актуальное время через 5 минут', async () => {
    vi.advanceTimersByTime(5 * 1000 * 60)
    await nextTick()
    const formattedTime = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    expect(wrapper.text()).toBe(formattedTime)
  })

  it('не имеет утечек работающих таймеров после уничтожения компонента', () => {
    const clearIntervalMock = vi.spyOn(window, 'clearInterval')
    const clearTimeoutMock = vi.spyOn(window, 'clearTimeout')
    wrapper.unmount()
    // Либо clearInterval, либо clearTimeout должен быть вызван ровно 1 раз
    expect(clearTimeoutMock.mock.calls.length + clearIntervalMock.mock.calls.length).toBe(1)
  })
})
