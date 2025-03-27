import { computed, defineComponent, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    // Создаём реактивную переменную для хранения текущего времени
    // Можно хранить как Date, так и число в UNIX timestamp
    const currentTime = ref(new Date())

    // Хранить отформатированное время будем в вычисляемом свойстве, чтобы не форматировать при каждом рендеринге
    // В таком компоненте нет разницы в производительности, но получается более чистое и декларативное решение
    const formattedTime = computed(() =>
      currentTime.value.toLocaleTimeString(navigator.language, { timeStyle: 'medium' }),
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
