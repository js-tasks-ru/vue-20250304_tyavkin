import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import MarkedEmailsApp, { getEmails } from '@/MarkedEmailsApp.js'
import EmailListItem from '@/EmailListItem.js'

describe('components/removable-emails', () => {
  const emails = getEmails()
  let wrapper: VueWrapper
  let list: VueWrapper[]

  beforeEach(() => {
    wrapper = mount(MarkedEmailsApp)
    list = wrapper.findAllComponents(EmailListItem)
  })

  it('рендерит список Email-ов', () => {
    expect(list).toHaveLength(emails.length)
    for (let i = 0; i < emails.length; i++) {
      expect(list[i].text()).toContain(emails[i])
    }
  })

  it('не удаляет список Email-ов при клике на элемент списка', async () => {
    await list[0].trigger('click')
    const newList = wrapper.findAllComponents(EmailListItem)
    for (let i = 0; i < newList.length; i++) {
      expect(newList[i].text()).toContain(emails[i])
    }
  })

  it('удаляет Email из списка при клике на кнопку удаления', async () => {
    await list[5].find('button[aria-label="Удалить"]').trigger('click')
    const newEmails = getEmails()
    newEmails.splice(5, 1)
    const newList = wrapper.findAllComponents(EmailListItem)
    for (let i = 0; i < newList.length; i++) {
      expect(newList[i].text()).toContain(newEmails[i])
    }
  })

  it('компонент EmailListItem не передаёт с каким-либо событием ничего лишнего, а событие не называется `click`', async () => {
    // Если у вас не проходит этот тест, то:
    // - Либо не порождается ни одного события
    // - Либо компонент порождает слишком много событий
    // - Либо с событием передаётся какая-то лишняя информация
    // - Либо событие называется `click`. Это некорректное название, так как происходит не общий клик по элементу, а именно удаление
    await list[0].find('button[aria-label="Удалить"]').trigger('click')
    const emitted = Object.entries(list[0].emitted())
      .filter(([eventName]) => eventName !== 'click')
      .map(([, args]) => args)
    expect(emitted).toHaveLength(1)
    expect(emitted[0][0]).toEqual([])
  })
})
