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
