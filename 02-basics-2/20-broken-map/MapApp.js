import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    let mousePosX = ref(0)
    let mousePosY = ref(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      mousePosX.value = event.offsetX
      mousePosY.value = event.offsetY
    }

    return {
      handleClick,
      mousePosX,
      mousePosY,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false"/>
      <span class="pin"
      :style="{left: mousePosX + 'px'}"
      :style="{top: mousePosY + 'px'}">📍</span>
    </div>
  `,
})
