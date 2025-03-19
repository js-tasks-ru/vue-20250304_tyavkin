# Отмеченные Email-ы

Первым делом требуется добавить реактивную переменную для хранения фильтра поиска и привязать его к полю поиска.

Дополнительно можно добавить модификатор `.trim`, чтобы игнорировать случайные пробелы в начале и в конце.

```js
const query = ref('');
```

```html
<input v-model.trim="query" type="search" aria-label="Search"/>
```

Осталось вывести Email-ы с маркировкой. Решение, которое может прийти первым - добавить функцию для проверки и
использовать её в шаблоне.

```js
function isMarked (email) {
  return query.value && email.includes(query.value)
}
```

```html
<li v-for="email in emails" :class="{ marked: isMarked(email) }">{{ email }}</li>
```

Но такое решение - не "Vue-way". Оно не декларативное, и вызывает функцию проверки Email-а при каждом рендеринге. Лучше
подготовить данные заранее к выводу. Это можно сделать несколькими способами, например, на основе массива строк с
Email-ами создать массив объектов, где помимо Email-а будет флаг маркировки.

```js
const markedEmails = computed(() => emails.map((email) => ({
  email,
  isMarked: query.value && email.includes(query.value),
})))
```

```html

<li v-for="{ email, isMarked } in markedEmails" :class="{ marked: isMarked }">{{ email }}</li>
```

## Полное решение

```js
import { computed, defineComponent, ref } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  // ...
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup () {
    const query = ref('')

    const markedEmails = computed(() => {
      return emails.map(email => ({
        email,
        isMarked: !!(query.value && email.toLowerCase().includes(query.value)),
      }))
    })

    return {
      query,
      markedEmails,
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input v-model.trim="query" type="search" aria-label="Search" />
      </div>
      <ul aria-label="Emails">
        <li v-for="{ email, isMarked } in markedEmails" :class="{ marked: isMarked }">
          {{ email }}
        </li>
      </ul>
    </div>
  `,
})
```
