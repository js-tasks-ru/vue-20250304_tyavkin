import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import MarkedEmailsApp, { emails } from '@/MarkedEmailsApp.js'

describe('MarkedEmailsApp', () => {
  let wrapper: VueWrapper
  let input: DOMWrapper<HTMLInputElement>
  let list: DOMWrapper<HTMLElement>[]

  beforeEach(() => {
    wrapper = mount(MarkedEmailsApp)
    input = wrapper.find('input[aria-label="Search"]')
    list = wrapper.findAll('ul[aria-label="Emails"] li')
  })

  it('должно рендерить поле поиска и список Email-ов', () => {
    expect(wrapper.exists()).toBe(true)
    expect(list).toHaveLength(emails.length)
    for (let i = 0; i < emails.length; i++) {
      expect(list[i].text()).toBe(emails[i])
    }
  })

  it('не должно отмечать ни один email классом маркировки .marked, когда запрос поиска пустой', async () => {
    expect(list.every(item => item.classes('marked'))).toBeFalsy()
  })

  it('должно отмечать Dallas@ole.me и Mallory_Kunze@marie.org классом маркировки .marked при поиске "all"', async () => {
    await input.setValue('all')
    expect(list).toHaveLength(emails.length)
    for (let i = 0; i < emails.length; i++) {
      const shouldMark = emails[i].includes('all')
      expect(list[i].classes('marked')).toBe(shouldMark)
    }
  })

  it('должно отметить все email-ы классом маркировки .marked, когда запрос поиска "@"', async () => {
    await input.setValue('@')
    expect(list).toHaveLength(emails.length)
    expect(list.every(item => item.classes('marked'))).toBeTruthy()
  })
})
