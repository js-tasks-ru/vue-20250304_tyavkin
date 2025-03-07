import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {
    const options = {
      dateStyle: 'long',
    }

    const currentDate = new Date().toLocaleDateString(navigator.language, options)

    return {
      currentDate,
    }
  },

  template: `<div>Сегодня {{currentDate}}</div>`,
})

const app = createApp(App)

app.mount('#app')
