import '@shgk/vue-course-ui/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router.ts'

createApp(App).use(router).mount('#app')
