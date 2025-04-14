import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { MockedFunction } from 'vitest'
import { createWrapperError, flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import SelectedMeetupApp from '../SelectedMeetupApp.js'
import { getMeetup } from '../meetupsService.ts'
import type { MeetupDTO } from '../meetups.types.ts'

vi.mock('../meetupsService.ts')

const mockMeetups = {
  1: { id: 1, title: 'Meetup 1' },
  2: { id: 2, title: 'Meetup Second' },
  3: { id: 3, title: 'Meetup III' },
  4: { id: 4, title: '4th meetup' },
  5: { id: 5, title: 'Meetup 5' },
} as const as unknown as Record<number, MeetupDTO>

const mockGetMeetup = getMeetup as MockedFunction<typeof getMeetup>

mockGetMeetup.mockImplementation((meetupId: number) => Promise.resolve(mockMeetups[meetupId]))

function findByText<T extends HTMLElement>(wrapper: VueWrapper, selector: string, text: string): DOMWrapper<T> {
  return wrapper.findAll<T>(selector).find(el => el.text() === text) ?? createWrapperError<DOMWrapper<T>>('DOMWrapper')
}

describe('SelectedMeetupApp', () => {
  let wrapper: VueWrapper
  let prevButton: DOMWrapper<HTMLButtonElement>
  let nextButton: DOMWrapper<HTMLButtonElement>
  let meetupIdRadioButtons: DOMWrapper<HTMLInputElement>[]
  let meetupIdRadioLabels: DOMWrapper<HTMLLabelElement>[]

  beforeEach(() => {
    wrapper = mount(SelectedMeetupApp)
    prevButton = findByText(wrapper, 'button', 'Предыдущий')
    nextButton = findByText(wrapper, 'button', 'Следующий')
    meetupIdRadioLabels = wrapper.findAll('label')
    meetupIdRadioButtons = meetupIdRadioLabels.map(label => wrapper.find(`input#${label.attributes('for')}`))
  })

  it('должно отображать 5 радио кнопок со значениями от 1 до 5, связанных по ID и FOR, а также кнопки "Предыдущий", "Следующий"', () => {
    expect(prevButton.exists()).toBe(true)
    expect(nextButton.exists()).toBe(true)
    expect(meetupIdRadioLabels).toHaveLength(5)
    expect(meetupIdRadioButtons).toHaveLength(5)
    for (let i = 1; i <= 5; i++) {
      expect(meetupIdRadioLabels[i - 1].text()).toBe(i.toString())
      expect(meetupIdRadioButtons[i - 1].exists()).toBeTruthy()
    }
  })

  it('должно изначально отображать первый митап выбранным и выводить его заголовок из данных, полученных функцией getMeetup', async () => {
    await flushPromises()
    expect(meetupIdRadioButtons[0].element.checked).toBeTruthy()
    expect(wrapper.text()).toContain('Meetup 1')
  })

  it('должно отображать кнопку "Предыдущий" отключенной при изначально выбранном первом митапе', async () => {
    expect(meetupIdRadioButtons[0].element.checked).toBeTruthy()
    expect(prevButton.attributes('disabled')).toBeDefined()
    expect(nextButton.attributes('disabled')).not.toBeDefined()
  })

  it('должно выводить заголовок 2-го митапа выбранным после выбора 2-ой радио кнопки и выводить его заголовок из данных, полученных функцией getMeetup', async () => {
    await meetupIdRadioButtons[1].setValue(true)
    await flushPromises()
    expect(wrapper.text()).toContain('Meetup Second')
  })

  it('должно выводить заголовок 5-го митапа после выбора 5-й радио кнопки', async () => {
    await meetupIdRadioButtons[4].setValue(true)
    await flushPromises()
    expect(wrapper.text()).toContain('Meetup 5')
  })

  it('должно отображать кнопку "Следующий" отключенной при выборе последнего митапа', async () => {
    await meetupIdRadioButtons[4].setValue(true)
    await flushPromises()
    expect(prevButton.attributes('disabled')).not.toBeDefined()
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('должно переключать с 3-го на 4-ый митап кнопкой "Следующий", когда был выбран 3-ий, и выводить его заголовок из данных, полученных функцией getMeetup', async () => {
    await meetupIdRadioButtons[2].setValue(true)
    await flushPromises()
    await nextButton.trigger('click')
    await flushPromises()
    expect(prevButton.attributes('disabled')).not.toBeDefined()
    expect(nextButton.attributes('disabled')).not.toBeDefined()
    expect(meetupIdRadioButtons[2].element.checked).toBeFalsy()
    expect(meetupIdRadioButtons[3].element.checked).toBeTruthy()
    expect(wrapper.text()).toContain('4th meetup')
  })

  it('должно переключать с 4-го на 3-ий митап кнопкой "Предыдущий", когда выбран 4-ый, и выводить его заголовок из данных, полученных функцией getMeetup', async () => {
    await meetupIdRadioButtons[3].setValue(true)
    await flushPromises()
    await prevButton.trigger('click')
    await flushPromises()
    expect(prevButton.attributes('disabled')).not.toBeDefined()
    expect(nextButton.attributes('disabled')).not.toBeDefined()
    expect(meetupIdRadioButtons[3].element.checked).toBeFalsy()
    expect(meetupIdRadioButtons[2].element.checked).toBeTruthy()
    expect(wrapper.text()).toContain('Meetup III')
  })
})
