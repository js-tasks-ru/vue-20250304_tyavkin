# Удаляемые Email-ы

Для решения задачи потребуется с событием передавать сообщение об удалении с компонента `EmailListItem` в корневой.

В компоненте `EmailListItem` добавим событие `remove` (или `delete`) без параметров, и будем порождать его по клику. Передавать с ним данные о том, какой именно Email удаляется - не требуется. Компонент выводит только один Email и не может сообщать об удалении другого Email-а.

```js
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  // Добавим событие в список событий
  emits: ['remove'],

  // Добавим обработчик события
  setup(props, { emit }) {
    function handleRemoveClick() {
      // Порождаем событие без параметров
      // Параметры не нужны. Этот компонент выводит только один email и сообщать может только о его удалении
      emit('remove')
    }
    return {
      handleRemoveClick,
    }
  },

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click.stop="handleRemoveClick">❌</button>
    </li>
  `,
})
```

Помните, что Vue события - это не аналог DOM событий. Они не всплывают. Это лишь форма для передачи коллбэков в дочерние компоненты, аналогично параметрам. Поэтому мы не можем обработать это событие сразу в корневом компоненте. Требуется пробрасывать его черед средний компонент.

В компоненте `EmailList` добавим обработчик события `remove`, и будем по нему порождать аналогичное событие `remove` уже для корневого компонента.

Так как этот компонент выводит список Email-ов, с событием требуется передать информацию о том, какой именно email удаляется. Это удобно сделать через индекс, так как Email-ы привязаны к массиву и имеют определённый порядок.

```js
import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['remove'],

  setup(props, { emit }) {
    function removeEmailByIndex(index) {
      emit('remove', index)
    }

    return {
      removeEmailByIndex,
    }
  },

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        @remove="removeEmailByIndex(index)"
      />
    </ul>
  `,
})
```

Остаётся только обработать это событие в корневом компоненте.

```html
<EmailList :emails="markedEmails" @remove="handleRemove" />
```
