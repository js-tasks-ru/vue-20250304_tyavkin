# MeetupView в `script setup`

Для превращения классического SFC в новый `<script setup>` требуется:
1. Добавить атрибут `setup` блоку `<script>`.
2. Описание пропсов перенести из опции `props` в макрос `defineProps`, сохранив возвращаемое значение в переменную при необходимости, например:
   - До
   ```js
   export default {
     props: {
       title: {
         type: String,
       },
       image: {
         type: String,
       },
     },
   }
   ```
   - После
   ```js
   const props = defineProps({
     title: {
      type: String,
     },
     image: {
       type: String,
     },
   })
   ```
3. Перенести содержимое метода `setup` в блок `<script setup>`, но без `return`, например
   - До
   ```js
   export default {
     setup(props) {
       const icon = computed(() => agendaItemIcons[props.agendaItem.type])
       const title = computed(() => agendaItemDefaultTitles[props.agendaItem.type])
       return {
         icon,
         title,
       }
     },
   }
   ```
   - После
   ```html
   <script setup>
   const icon = computed(() => agendaItemIcons[props.agendaItem.type])
   const title = computed(() => agendaItemDefaultTitles[props.agendaItem.type])
   </script>
   ```
4. Удалить весь оставшийся `export default`.
