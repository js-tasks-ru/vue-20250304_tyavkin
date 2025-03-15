import { computed, defineComponent, ref } from 'vue'
import { UiFormGroup, UiInput } from '@shgk/vue-course-ui'
import EmailList from './EmailList.js'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export function getEmails() {
  return [
    'Eliseo@gardner.biz',
    'Jayne_Kuhic@sydney.com',
    'Nikita@garfield.biz',
    'Lew@alysha.tv',
    'Hayden@althea.biz',
    'Presley.Mueller@myrl.com',
    'Dallas@ole.me',
    'Mallory_Kunze@marie.org',
    'Meghan_Littel@rene.us',
    'Carmen_Keeling@caroline.name',
    'Veronica_Goodwin@timmothy.net',
    'Oswald.Vandervort@leanne.org',
    'Kariane@jadyn.tv',
    'Nathan@solon.io',
    'Maynard.Hodkiewicz@roberta.com',
    'Christine@ayana.info',
    'Preston_Hudson@blaise.tv',
    'Vincenza_Klocko@albertha.name',
    'Madelynn.Gorczany@darion.biz',
    'Mariana_Orn@preston.org',
    'Noemie@marques.me',
    'Khalil@emile.co.uk',
    'Sophia@arianna.co.uk',
    'Jeffery@juwan.us',
    'Isaias_Kuhic@jarrett.net',
  ]
}

export default defineComponent({
  name: 'MarkedEmailsApp',

  components: {
    UiFormGroup,
    UiInput,
    EmailList,
  },

  setup() {
    const emails = ref(getEmails())
    const query = ref('')

    const markedEmails = computed(() => {
      return emails.value.map(email => ({
        email,
        isMarked: !!(query.value && email.toLowerCase().includes(query.value.toLowerCase())),
      }))
    })

    function removeEmailByIndex(index) {
      emails.value.splice(index, 1)
    }

    return {
      query,
      markedEmails,
      removeEmailByIndex,
    }
  },

  template: `
    <div>
      <UiFormGroup>
        <UiInput v-model.trim="query" type="search" placeholder="Поиск" aria-label="Поиск" small />
      </UiFormGroup>
      <EmailList :emails="markedEmails" />
    </div>
  `,
})
