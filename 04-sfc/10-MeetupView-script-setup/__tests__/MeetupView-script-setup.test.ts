import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'
import MeetupView from '@/MeetupView.vue'
import MeetupAgenda from '@/MeetupAgenda.vue'
import MeetupAgendaItem from '@/MeetupAgendaItem.vue'
import MeetupDescription from '@/MeetupDescription.vue'
import MeetupCover from '@/MeetupCover.vue'
import MeetupInfo from '@/MeetupInfo.vue'
import meetups from '@/meetups.fixture.ts'

function isSfcSetup(component: Component): boolean {
  return '__name' in component
}

describe('sfc/MeetupView-script-setup', () => {
  describe('MeetupView', () => {
    const meetup = meetups[0]
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = shallowMount(MeetupView, {
        props: { meetup },
        global: {
          renderStubDefaultSlot: true,
        },
      })
    })

    it('отображает изображение и заголовок митапа с MeetupCover', () => {
      const cover = wrapper.findComponent({ name: 'MeetupCover' })
      expect(cover.exists()).toBeTruthy()
      expect(cover.props('title')).toBe(meetup.title)
      expect(cover.props('image')).toBe(meetup.image)
    })

    it('отображает описание митапа с MeetupDescription', () => {
      const description = wrapper.findComponent({ name: 'MeetupDescription' })
      expect(description.exists()).toBeTruthy()
      expect(description.props('description')).toBe(meetup.description)
    })

    it('отображает краткую информацию митапа с MeetupInfo', () => {
      const info = wrapper.findComponent({ name: 'MeetupInfo' })
      expect(info.exists()).toBeTruthy()
      expect(info.props('organizer')).toBe(meetup.organizer)
      expect(info.props('place')).toBe(meetup.place)
      expect(info.props('date')).toBe(meetup.date)
    })

    it('отображает программу митапа с MeetupAgenda', () => {
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' })
      expect(agenda.exists()).toBeTruthy()
      expect(agenda.props('agenda')).toEqual(meetup.agenda)
    })

    it('отображает сообщение через UiAlert, если в параметре meetup пустая программа agenda', async () => {
      await wrapper.setProps({ meetup: { ...meetup, agenda: [] } })
      const uiAlert = wrapper.findComponent({ name: 'UiAlert' })
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' })
      expect(uiAlert.exists()).toBeTruthy()
      expect(agenda.exists()).toBeFalsy()
    })

    it('не отображает сообщение с UiAlert, если в параметре meetup непустая программа agenda', () => {
      const uiAlert = wrapper.findComponent({ name: 'UiAlert' })
      expect(uiAlert.exists()).toBeFalsy()
    })
  })

  it('MeetupView реализован через <script setup>', () => {
    expect(isSfcSetup(MeetupView)).toBeTruthy()
  })

  it('MeetupAgenda реализован через <script setup>', () => {
    expect(isSfcSetup(MeetupAgenda)).toBeTruthy()
  })

  it('MeetupAgendaItem реализован через <script setup>', () => {
    expect(isSfcSetup(MeetupAgendaItem)).toBeTruthy()
  })

  it('MeetupDescription реализован через <script setup>', () => {
    expect(isSfcSetup(MeetupDescription)).toBeTruthy()
  })

  it('MeetupCover реализован через <script setup>', () => {
    expect(isSfcSetup(MeetupCover)).toBeTruthy()
  })

  it('MeetupInfo реализован через <script setup>', () => {
    expect(isSfcSetup(MeetupInfo)).toBeTruthy()
  })
})
