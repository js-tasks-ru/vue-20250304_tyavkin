# MeetupView

В задаче требуется заменить пропущенные места в компоненте `MeetupView` на использование готовых компонентов и передать в них параметры.

## Полное решение

```js
import { defineComponent } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',

  components: {
    MeetupAgenda,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    UiAlert,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image" />
      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h2>Описание</h2>
            <MeetupDescription :description="meetup.description" />
            <h2>Программа</h2>
            <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
            <UiAlert v-else>Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
```
