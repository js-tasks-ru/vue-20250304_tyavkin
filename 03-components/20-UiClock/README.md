# UiClock

Основная часть задачи не сложная. Требуется иметь реактивную переменную с текущим временем, обновлять её каждую секунду
и форматировать вывод.

```js
// Создаём реактивную переменную для хранения текущего времени
// Можно хранить как Date, так и число в UNIX timestamp
const currentTime = ref(new Date())

// Хранить отформатированное время будем в вычисляемом свойстве, чтобы не форматировать при каждом рендеринге
// В таком компоненте нет разницы в производительности, но получается более чистое и декларативное решение
const formattedTime = computed(() =>
  currentTime.value.toLocaleTimeString(navigator.language, {timeStyle: 'medium'}),
)

// Создадим интервал для обновления времени каждую секунду
setInterval(() => {
  currentTime.value = new Date()
}, 1000)
```

Но в этом решении есть утечка памяти. Каждый экземпляр компонента создаёт новый интервал.

Попробуйте добавить лог в интервал, например, следующим образом:

```js
setInterval(() => {
  console.log('Updated')
  currentTime.value = new Date()
}, 1000)
```

Затем множество раз скроем и отобразим компонент с часами. Даже при отсутствии на странице часов, функция в интервале
будет вызываться многократно, обновляя реактивную переменную.

<img src="https://i.imgur.com/veTS9Xh.gif" alt="" />

Чтобы избежать утечки, требуется сохранить `intervalId` и очищать интервал при удалении компонента. Это можно сделать
через хук жизненного цикла `onUnmounted`:

```js
const intervalId = setInterval(() => {
  currentTime.value = new Date()
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})
```

## Полное решение

```js
import { computed, defineComponent, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup () {
    // Создаём реактивную переменную для хранения текущего времени
    // Можно хранить как Date, так и число в UNIX timestamp
    const currentTime = ref(new Date())

    // Хранить отформатированное время будем в вычисляемом свойстве, чтобы не форматировать при каждом рендеринге
    // В таком компоненте нет разницы в производительности, но получается более чистое и декларативное решение
    const formattedTime = computed(() =>
      currentTime.value.toLocaleTimeString(navigator.language, {timeStyle: 'medium'}),
    )

    // Создадим интервал для обновления времени каждую секунду
    const tickIntervalId = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)

    // Важная часть - не забыть очистить интервал при удалении компонента
    // В противном случае будет утечка, таймер продолжит работать даже после удаления компонента
    onUnmounted(() => {
      clearInterval(tickIntervalId)
    })

    return {
      formattedTime,
    }
  },

  template: `<div class="clock">{{ formattedTime }}</div>`,
})
```
