import { describe, it, expect, beforeAll } from 'vitest'
import type { App } from 'vue'

describe('create-app', () => {
  beforeAll(async () => {
    const appElement = document.createElement('div')
    appElement.id = 'app'
    document.body.appendChild(appElement)
    await import('../script.js')
  })

  it('монтирует Vue приложение в элемент #app', () => {
    const app = document.getElementById('app')
    expect(app).toBeDefined()
    expect(app).toHaveProperty('__vue_app__')
  })

  it('имеет имя (name) и шаблон (template) у приложения в элементе #app', () => {
    const app = document.getElementById('app') as HTMLElement & { __vue_app__: App }
    const appInstance = app.__vue_app__
    const componentDefinition = appInstance?._instance?.proxy?.$options
    expect(componentDefinition).toHaveProperty('name')
    expect(componentDefinition).toHaveProperty('template')
  })

  it('рендерит строку "Сегодня: DATE" с сегодняшней датой локализовано в формате dateStyle: \'long\'', async () => {
    const app = document.getElementById('app')
    expect(app?.innerText).toContain(
      `Сегодня ${new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })}`,
    )
  })
})
