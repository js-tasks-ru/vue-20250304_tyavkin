# Выбранный митап

Приложению требуется как минимум две реактивные переменные:

1. `meetupId` с текущим выбранным `id`
2. `meetup` с данными текущего митапа

Опустим части решения с реализацией радио кнопок и кнопок "Предыдущий"/"Следующий". Аналогичные подзадачи уже встречались в предыдущих задачах. 

Будем отслеживать через `watch` изменение `meetupId` и обновлять данные митапа. Можно также использовать `watchEffect`.

Обратите внимание, что мы не можем использовать `computed` здесь, так как нам требуется вызывать асинхронную функцию с побочным эффектом (запрос данных), а не просто синхронно вычислить результат, как в предыдущих задачах. 

Так как нам сразу нужны данные первого выбранного митапа, требуется или вызывать функцию получения данных отдельно, или просто добавить `{ immediate: true }` в `watch`.

```js
watch(
  meetupId,
  async () => {
    meetup.value = await getMeetup(meetupId.value)
  },
  { immediate: true },
)
```

Помните, что при первом рендеринге компонента данных ещё нет. В шаблоне требуется проверка, чтобы не выводить данные, которых нет, и не обращаться к свойствам у `null`.

```html
<div v-if="meetup" class="meetup-selector__cover">
  <div class="meetup-cover">
    <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
  </div>
</div>
```

### Минимальное решение

```js
import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupId = ref(1)
    const meetup = ref(null)

    watch(
      meetupId,
      async () => {
        meetup.value = await getMeetup(meetupId.value)
      },
      { immediate: true },
    )

    return {
      meetupId,
      meetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupId <= 1" @click="meetupId -= 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="i in 5" class="radio-group__button">
            <input
              :id="\`meetup-id-\${i}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="i"
              v-model="meetupId"
            />
            <label :for="\`meetup-id-\${i}\`" class="radio-group__label">
              {{ i }}
            </label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="meetupId >= 5" @click="meetupId += 1">Следующий</button>
      </div>

      <div v-if="meetup" class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
```

### Полное решение

Можно добавить констант для более универсального определения границ диапазона `id` митапов.

```js
import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const MIN_ID = 1
    const MAX_ID = 5
    const ids = Array.from({ length: MAX_ID }, (_, i) => i + MIN_ID)
    const meetupId = ref(1)
    const meetup = ref(null)

    watch(
      meetupId,
      async () => {
        meetup.value = await getMeetup(meetupId.value)
      },
      { immediate: true },
    )

    return {
      ids,
      MIN_ID,
      MAX_ID,
      meetupId,
      meetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupId <= MIN_ID" @click="meetupId -= 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="i in ids" class="radio-group__button">
            <input
              :id="\`meetup-id-\${i}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="i"
              v-model="meetupId"
            />
            <label :for="\`meetup-id-\${i}\`" class="radio-group__label">
              {{ i }}
            </label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="meetupId >= MAX_ID" @click="meetupId += 1">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div v-if="meetup" class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
```
