import { defineComponent, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    function getTimeString(dateTime) {
      return dateTime.toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    }

    const time = ref(getTimeString(new Date()))

    const timer = setInterval(function () {
      time.value = getTimeString(new Date())
    }, 1000)

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
