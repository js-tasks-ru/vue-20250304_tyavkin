import { describe, beforeEach, it, expect } from 'vitest'
import type { VueWrapper, BaseWrapper } from '@vue/test-utils'
import { flushPromises, mount } from '@vue/test-utils'
import { router } from '../router/router.ts'
import App from '../App.vue'
import MeetupsNav from '../components/MeetupsNav.vue'
import PageIndex from '../views/PageIndex.vue'
import PageLogin from '../views/PageLogin.vue'
import PageRegister from '../views/PageRegister.vue'

const findByText = (wrappers: BaseWrapper<Element>[], text: string) =>
  wrappers.find(wrapper => wrapper.element.textContent?.includes(text))

describe('vue-router/basic-router', () => {
  let app: VueWrapper<InstanceType<typeof App>>

  beforeEach(() => {
    app = mount(App, {
      global: {
        plugins: [router],
      },
    })
  })

  describe('Конфигурация роутера', () => {
    it('PageIndex должен рендериться на странице /', async () => {
      await router.replace('/').catch(() => {})
      expect(app.findComponent(PageIndex).exists()).toBeTruthy()
    })

    it('PageLogin должен рендериться на странице /login', async () => {
      await router.replace('/login')
      expect(app.findComponent(PageLogin).exists()).toBeTruthy()
    })

    it('PageRegister должен рендериться на странице /register', async () => {
      await router.replace('/register')
      expect(app.findComponent(PageRegister).exists()).toBeTruthy()
    })
  })

  describe('Навигация', () => {
    it('MeetupsNav должен содержать ссылку Вход на страницу авторизации', async () => {
      await router.replace('/')
      await findByText(app.getComponent(MeetupsNav).findAll('a'), 'Вход')?.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/login')
    })

    it('MeetupsNav должен содержать ссылку Регистрация на страницу регистрации', async () => {
      await router.replace('/')
      await findByText(app.getComponent(MeetupsNav).findAll('a'), 'Регистрация')?.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/register')
    })
  })

  describe('PageRegister', () => {
    it('PageRegister должен содержать ссылку на страницу авторизации', async () => {
      await router.replace({ path: '/register' })
      await findByText(app.getComponent(PageRegister).findAll('a'), 'Войдите')?.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/login')
    })

    it('PageRegister должен перенаправлять на страницу авторизации при сабмите формы', async () => {
      await router.replace({ path: '/register' })
      await app.getComponent(PageRegister).get('form').trigger('submit')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/login')
    })
  })

  describe('PageLogin', () => {
    it('PageLogin должен содержать ссылку на страницу регистрации', async () => {
      await router.replace({ path: '/login' })
      await findByText(await app.getComponent(PageLogin).get('form').findAll('a'), 'Зарегистрируйтесь')?.trigger(
        'click',
      )
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/register')
    })

    it('PageLogin должен перенаправлять на главную страницу при сабмите формы', async () => {
      await router.replace({ path: '/login' })
      await app.getComponent(PageLogin).get('form').trigger('submit')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/')
    })

    it('PageLogin должен перенаправлять на маршрут из query параметра from=/foo при сабмите формы', async () => {
      await router.replace({ path: '/login', query: { from: '/foo' } })
      await app.getComponent(PageLogin).get('form').trigger('submit')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/foo')
    })

    it('PageLogin должен перенаправлять на маршрут из query параметра from=/bar при сабмите формы', async () => {
      await router.replace({ path: '/login', query: { from: '/bar' } })
      await app.getComponent(PageLogin).get('form').trigger('submit')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/bar')
    })
  })
})
