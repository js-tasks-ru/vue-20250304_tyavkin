# Шаблон: погода в Средиземье

Для решения задачи потребуется несколько вспомогательных функций форматирования:

```js
/**
 * Конвертировать температуру из градусов Кельвинов в градусы Цельсии
 * @param {number} kelvin - Температура в градусах Кельвинах
 * @return {number} Температура в градусах Цельсиях
 */
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15
}

/**
 * Конвертировать давление из гектопаскалей в мм рт. ст.
 * @param {number} hPa - Давление в гектопаскалях
 * @return {number} Давление в мм рт. ст.
 */
function hPaToMmHg(hPa) {
  return hPa * 0.75
}

/**
 * Получить иконку для погодных условий
 * @param {number} weatherConditionId - Идентификатор погодных условий
 * @return {string} Иконка погодных условий в emoji
 */
function getWeatherConditionIcon(weatherConditionId) {
  return WeatherConditionIcons[weatherConditionId]
}

/**
 * Проверить, что сейчас ночь (время после заката или до восхода)
 * @param {string} currentTime - Текущее время в формате HH:MM
 * @param {string} sunriseTime - Время восхода солнца в формате HH:MM
 * @param {string} sunsetTime - Время заката солнца в формате HH:MM
 * @return {boolean} true, если сейчас ночь, иначе false
 */
function isNight(currentTime, sunriseTime, sunsetTime) {
  return currentTime < sunriseTime || currentTime > sunsetTime
}
```

Вместо этих функций можно также выполнять вычисления прямо в шаблоне.

В любом случае, все вспомогательные функции, как и данные о погоде, должны быть возвращены в `setup`, чтобы быть в
свойствах экземпляра и доступы в шаблоне.

```js
export default {
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()

    // ... Описание вспомогательных функций

    return {
      weatherData,
      kelvinToCelsius,
      hPaToMmHg,
      getWeatherConditionIcon,
      isNight,
    }
  },

  template: `...`,
}
```

В шаблоне потребуется:

- Текстовая интерполяция для вывода значений
- Директива повторения `v-for="data in weatherData"` для перебора списка географических объектов
- Директива `v-bind:title` для вывода подсказки с текстовым описанием погодных условий
- Директива условного рендеринга `v-if` для вывода предупреждения только при наличии
- Директива привязки `v-bind:class` для условного добавления класса `.weather-card--night`

```html
<div>
  <h1 class="title">Погода в Средиземье</h1>

  <ul class="weather-list unstyled-list">
    <li
      v-for="data in weatherData"
      class="weather-card"
      :class="{ 'weather-card--night': isNight(data.current.dt, data.current.sunrise, data.current.sunset) }"
    >
      <div v-if="data.alert" class="weather-alert">
        <span class="weather-alert__icon">⚠️</span>
        <span class="weather-alert__description">{{ data.alert.sender_name }}: {{ data.alert.description }}</span>
      </div>
      <div>
        <h2 class="weather-card__name">{{ data.geographic_name }}</h2>
        <div class="weather-card__time">{{ data.current.dt }}</div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="data.current.weather.description">
          {{ getWeatherConditionIcon(data.current.weather.id) }}
        </div>
        <div class="weather-conditions__temp">{{ kelvinToCelsius(data.current.temp).toFixed(1) }} °C</div>
      </div>
      <div class="weather-details">
        <div class="weather-details__item">
          <div class="weather-details__item-label">Давление, мм рт. ст.</div>
          <div class="weather-details__item-value">{{ hPaToMmHg(data.current.pressure).toFixed(0) }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Влажность, %</div>
          <div class="weather-details__item-value">{{ data.current.humidity }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Облачность, %</div>
          <div class="weather-details__item-value">{{ data.current.clouds }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Ветер, м/с</div>
          <div class="weather-details__item-value">{{ data.current.wind_speed }}</div>
        </div>
      </div>
    </li>
  </ul>
</div>
```

## Полное решение

```js
import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()

    /**
     * Конвертировать температуру из градусов Кельвинов в градусы Цельсии
     * @param {number} kelvin - Температура в градусах Кельвинах
     * @return {number} Температура в градусах Цельсиях
     */
    function kelvinToCelsius(kelvin) {
      return kelvin - 273.15
    }

    /**
     * Конвертировать давление из гектопаскалей в мм рт. ст.
     * @param {number} hPa - Давление в гектопаскалях
     * @return {number} Давление в мм рт. ст.
     */
    function hPaToMmHg(hPa) {
      return hPa * 0.75
    }

    /**
     * Получить иконку для погодных условий
     * @param {number} weatherConditionId - Идентификатор погодных условий
     * @return {string} Иконка погодных условий в emoji
     */
    function getWeatherConditionIcon(weatherConditionId) {
      return WeatherConditionIcons[weatherConditionId]
    }

    /**
     * Проверить, что сейчас ночь (время после заката или до восхода)
     * @param {string} currentTime - Текущее время в формате HH:MM
     * @param {string} sunriseTime - Время восхода солнца в формате HH:MM
     * @param {string} sunsetTime - Время заката солнца в формате HH:MM
     * @return {boolean} true, если сейчас ночь, иначе false
     */
    function isNight(currentTime, sunriseTime, sunsetTime) {
      return currentTime < sunriseTime || currentTime > sunsetTime
    }

    return {
      weatherData,
      kelvinToCelsius,
      hPaToMmHg,
      getWeatherConditionIcon,
      isNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
    
      <ul class="weather-list unstyled-list">
        <li
          v-for="data in weatherData"
          class="weather-card"
          :class="{ 'weather-card--night': isNight(data.current.dt, data.current.sunrise, data.current.sunset) }"
        >
          <div v-if="data.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ data.alert.sender_name }}: {{ data.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">{{ data.geographic_name }}</h2>
            <div class="weather-card__time">{{ data.current.dt }}</div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="data.current.weather.description">
              {{ getWeatherConditionIcon(data.current.weather.id) }}
            </div>
            <div class="weather-conditions__temp">{{ kelvinToCelsius(data.current.temp).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ hPaToMmHg(data.current.pressure).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ data.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ data.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ data.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
```
