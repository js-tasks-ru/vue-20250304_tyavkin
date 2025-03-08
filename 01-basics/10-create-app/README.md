# createApp

Для создания приложения требуется сначала описать корневой компонент, включающий:

- Имя в поле `name`
- Создание его свойств в свойстве `setup`
- Шаблон в свойстве `template`

Свойство определим используя `toLocaleDateString`.

В шаблоне выведем дату используя текстовую интерполяцию.

```js
const App = defineComponent({
  name: 'App',

  setup() {
    const date = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    return {
      date,
    }
  },

  template: `<div>Сегодня {{ date }}</div>`,
})
```

Можно обойтись без использования `setup`, выполнив выражение прямо в шаблоне. Но в этом случае шаблон получится
перегруженным сложным выражением.

```js
// Допустимое решение
const App = defineComponent({
  name: 'App',
  // Немного перегружено сложным выражением
  template: `<div>Сегодня {{ new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' }) }}</div>`,
})
```

После описания корневого компонента, его можно использовать в создании и монтировании приложения.

```js
const app = createApp(App)
app.mount('#app')
```

Или просто

```js
createApp(App).mount('#app')
```

## Полное решение

```js
const App = defineComponent({
  name: 'App',

  setup() {
    const date = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    return {
      date,
    }
  },

  template: `<div>Сегодня {{ date }}</div>`,
})

createApp(App).mount('#app')
```
