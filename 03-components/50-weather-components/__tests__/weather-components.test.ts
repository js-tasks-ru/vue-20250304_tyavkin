import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import { WeatherConditionIcons, getWeatherData } from '../weather.service.ts'
import WeatherApp from '../WeatherApp.js'

describe('components/weather-components', () => {
  const weatherData = getWeatherData()
  let wrapper: VueWrapper
  let cards: DOMWrapper<HTMLElement>[]

  beforeEach(() => {
    wrapper = mount(WeatherApp)
    cards = wrapper.findAll('li.weather-card')
  })

  it('отображает карточки с погодой из getWeatherData для каждого географического объекта', () => {
    expect(cards).toHaveLength(weatherData.length)
  })

  it('отображает название географического объекта в .weather-card__name и его локальное время в .weather-card__time', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]

      expect(card.find('.weather-card__name').text()).toContain(item.geographic_name)
      expect(card.find('.weather-card__time').text()).toContain(item.current.dt)
    }
  })

  it('отображает карточки с температурой в градусах Цельсия с ровно 1 знаком после запятой в .weather-conditions__temp', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]
      expect(card.find('.weather-conditions__temp').text()).toContain((item.current.temp - 273.15).toFixed(1) + ' °C')
    }
  })

  it('отображает карточки с погодными условиями с соответствующей иконкой погодных условий в .weather-conditions__icon', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]
      expect(card.find('.weather-conditions__icon').text()).toContain(WeatherConditionIcons[item.current.weather.id])
    }
  })

  it('отображает карточки с погодными условиями с соответствующим описанием погодных условий в title в .weather-conditions__icon', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]
      expect(card.find('.weather-conditions__icon').attributes('title')).toContain(item.current.weather.description)
    }
  })

  it('отображает карточки с подробностями погоды в .weather-details', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]
      const details = card.findAll('.weather-details__item-value')
      expect(details[0].text()).toContain((item.current.pressure * 0.75).toFixed(0))
      expect(details[1].text()).toContain(item.current.humidity)
      expect(details[2].text()).toContain(item.current.clouds)
      expect(details[3].text()).toContain(item.current.wind_speed)
    }
  })

  it('отображает карточки с погодой с классом .weather-card--night, если локальное время не между рассветом и закатом', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      if (i < 2) {
        expect(card.classes()).toContain('weather-card--night')
      } else {
        expect(card.classes()).not.toContain('weather-card--night')
      }
    }
  })

  it('отображает карточки с погодой с предупреждением при наличии alert в данных в блоке .weather-alert', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]
      if (item.alert) {
        expect(card.find('.weather-alert').exists()).toBeTruthy()
        expect(card.find('.weather-alert__description').text()).toContain(item.alert.sender_name)
        expect(card.find('.weather-alert__description').text()).toContain(item.alert.description)
      } else {
        expect(card.find('.weather-alert').exists()).toBeFalsy()
      }
    }
  })

  it('отображает карточки с погодой без предупреждением при отсутствии alert в данных', () => {
    expect(cards).toHaveLength(weatherData.length)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const item = weatherData[i]
      if (!item.alert) {
        expect(card.find('.weather-alert').exists()).toBeFalsy()
      }
    }
  })
})
