import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    const x = ref(0)
    const y = ref(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    // Для удобства вынесем вычисление стиля позиционирования в отдельное вычисляемое свойство
    // Можно обойтись и без вычисляемого свойств, сразу прописывая стили в шаблоне
    const pinPositionStyle = computed(() => ({
      left: `${x.value}px`,
      top: `${y.value}px`,
    }))

    return {
      pinPositionStyle,
      handleClick,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <!-- Стили должны определяться шаблоном через привязку -->
      <span class="pin" :style="pinPositionStyle">📍</span>
    </div>
  `,
})
