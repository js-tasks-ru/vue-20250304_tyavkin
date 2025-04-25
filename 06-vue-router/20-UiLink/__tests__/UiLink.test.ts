import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import UiLink from '../components/UiLink.vue'

describe('vue-router/UiLink', () => {
  it('должен рендерить гиперссылку <a> с href и контентом', () => {
    const wrapper = mount(UiLink, {
      props: { href: '/link' },
      slots: { default: 'Link Text' },
      global: {
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    const routerLink = wrapper.findComponent(RouterLinkStub)
    expect(routerLink.exists()).toBe(false)
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/link')
    expect(wrapper.text()).toBe('Link Text')
  })

  it('должен рендерить компонент <RouterLink> с to и контентом', () => {
    const wrapper = mount(UiLink, {
      props: { to: '/route' },
      slots: { default: 'Router Link Text' },
      global: {
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    const routerLink = wrapper.findComponent(RouterLinkStub)
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.props('to')).toBe('/route')
    expect(wrapper.text()).toBe('Router Link Text')
  })
})
