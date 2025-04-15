# Основы Vue Router

## Конфигурация роутера

В `main.ts` требуется подключить роутер как плагин:

```js
import { router } from './router/router.ts'

createApp(App).use(router).mount('#app')
```

В конфигурации роутера в массив `routes` требуется добавить два новых маршрута:

```js
export const router = createRouter({
  // ...
  routes: [
    // ...
    {
      path: '/login',
      name: 'login',
      component: PageLogin,
    },
    {
      path: '/register',
      name: 'register',
      component: PageRegister,
    },
  ]
})
```

А в `App.vue` нужно добавить `<RouterView />` вместо вывода компонента `PageIndex`:

```html
<div class="wrapper">
  <MeetupsHeader />
  <main class="main">
    <RouterView /> <!-- RouterView вместо конкретной страницы -->
  </main>
  <MeetupsFooter />
</div>
```

## Навигация

И ссылки в компоненте `MeetupsNav`, и ссылки в компонентах `PageLogin` и `PageRegister` должны быть реализованы с помощью компонента `<RouterLink>`, например:

```html
<RouterLink to="/login">
  Вход
</RouterLink>

<!-- Или с именованными маршрутами -->

<RouterLink :to="{ name: 'login' }">
  Вход
</RouterLink>
```

## PageRegister

На странице регистрации требуется программный переход после сабмита формы. Для этого требуется получить роутер с помощью `useRouter` и вызвать метод `router.push()` с нужным маршрутом:

```js
import { useRouter } from 'vue-router'

// Получаем роутер с помощью useRouter
const router = useRouter()

async function onSubmit() {
  try {
    await register()

    router.push('/login')
    // Или с именованными маршрутами
    router.push({ name: 'login' })
  } catch (error) {
    // ...
  }
}
```

## PageLogin

В компоненте `PageLogin` перенаправление интереснее, и зависит от query параметра `from`.

Первый вариант - это получить его из `route.query` с помощью `useRoute`:

```js
import { useRoute } from 'vue-router'

const from = computed(() => route.query.from ?? '/')
// Или
const from = computed(() => route.query.from ?? { name: 'index' })

async function onSubmit() {
  try {
    await login()

    router.push(from.value)
  } catch (error) {
    // ...
  }
}
```

Второй вариант - настроить `props` в описании маршрута, передавая `to.query.from` в параметры компонента.

Добавляем описание параметра `from` в `PageLogin`:

```js
const props = defineProps({
  from: {
    type: String,
    default: '/',
  },
})

async function onSubmit() {
  try {
    await register()

    router.push(from)
  } catch (error) {
    // ...
  }
}
```

Или на TypeScript:

```ts
import type { RouteLocationRaw } from 'vue-router'

const { from = {  name: 'index' } } = defineProps<{
  from?: RouteLocationRaw
}>()
```

Остаётся только передавать `from` в `props` в конфигурации маршрута:

```js
// router.ts

export const router = createRouter({
  // ...
  routes: [
    // ...
    {
      path: '/login',
      name: 'login',
      // Передаём query параметр from в параметр from компонента
      props: (to) => ({
        from: to.query.from,
      }),
      component: PageLogin,
    },
  ]
})
```
