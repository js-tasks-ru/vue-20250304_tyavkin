// Основано на https://openweathermap.org/api

export const WeatherConditionIcons = {
  // Thunderstorm
  200: '⛈️', // Thunderstorm with light rain
  201: '⛈️', // Thunderstorm with rain
  202: '⛈️', // Thunderstorm with heavy rain
  210: '🌩️', // Light thunderstorm
  211: '🌩️', // Thunderstorm
  212: '🌩️', // Heavy thunderstorm
  221: '🌩️', // Ragged thunderstorm
  230: '⛈️', // Thunderstorm with light drizzle
  231: '⛈️', // Thunderstorm with drizzle
  232: '⛈️', // Thunderstorm with heavy drizzle
  // Drizzle
  300: '🌧️', // Light intensity drizzle
  301: '🌧️', // Drizzle
  302: '🌧️', // Heavy intensity drizzle
  310: '🌧️', // Light intensity drizzle rain
  311: '🌧️', // Drizzle rain
  312: '🌧️', // Heavy intensity drizzle rain
  313: '🌧️', // Shower rain and drizzle
  314: '🌧️', // Heavy shower rain and drizzle
  321: '🌧️', // Shower drizzle
  // Rain
  500: '🌦️', // Light rain
  501: '🌦️', // Moderate rain
  502: '🌦️', // Heavy intensity rain
  503: '🌦️', // Very heavy rain
  504: '🌦️', // Extreme rain
  511: '🌨️', // Freezing rain
  520: '🌧️', // Light intensity shower rain
  521: '🌧️', // Shower rain
  522: '🌧️', // Heavy intensity shower rain
  531: '🌧️', // Ragged shower rain
  // Snow
  600: '🌨️', // Light snow
  601: '🌨️', // Snow
  602: '🌨️', // Heavy snow
  611: '🌨️', // Sleet
  612: '🌨️', // Light shower sleet
  613: '🌨️', // Shower sleet
  615: '🌨️', // Light rain and snow
  616: '🌨️', // Rain and snow
  620: '🌨️', // Light shower snow
  621: '🌨️', // Shower snow
  622: '🌨️', // Heavy shower snow
  // Atmosphere
  701: '🌫️', // Mist
  711: '🌫️', // Smoke
  721: '🌫️', // Haze
  731: '🌫️', // Dust
  741: '🌫️', // Fog
  751: '🌫️', // Sand
  761: '🌫️', // Dust
  762: '🌋', // Volcanic ash
  771: '🌫️', // Squalls
  781: '🌪️', // Tornado
  // Clouds
  800: '☀️', // Clear sky
  801: '🌤️', // Clouds 11-25%
  802: '⛅', // Clouds 25-50%
  803: '⛅', // Clouds 51-84%
  804: '☁️', // Clouds 85-100%
} as const

type WeatherData = {
  /** Географическое название */
  geographic_name: string
  /** Текущая погода */
  current: {
    /** Текущее локальное время в формате HH:MM 24h */
    dt: string
    /** Время восхода солнца в формате HH:MM 24h */
    sunrise: string
    /** Время заката солнца в формате HH:MM 24h */
    sunset: string
    /** Температура воздуха в Кельвинах (для перевода в Цельсии нужно отнять 273.15) */
    temp: number
    /** Давление в мПа */
    pressure: number
    /** Влажность в процентах */
    humidity: number
    /** Облачность в процентах */
    clouds: number
    /** Видимость в метрах */
    visibility: number
    /** Максимальная скорость ветра в м/с */
    wind_speed: number
    /** Погодные условия */
    weather: {
      /** Идентификатор погодных условий */
      id: keyof typeof WeatherConditionIcons
      /** Группа погодных условий */
      main: string
      /** Описание погодных условий */
      description: string
    }
  }
  /** Текущие предупреждения от национальных агентств */
  alert: {
    sender_name: string
    description: string
  } | null
}

// Шир
// Эриадор
//
// Гондор
// Рохан
//
// Мордор

export function getWeatherData(): WeatherData[] {
  return [
    {
      geographic_name: 'Шир',
      current: {
        dt: '04:27',
        sunrise: '05:54',
        sunset: '19:23',
        temp: 285.55,
        pressure: 1015,
        humidity: 85,
        clouds: 8,
        visibility: 10000,
        wind_speed: 1.39,
        weather: {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
        },
      },
      alert: null,
    },
    {
      geographic_name: 'Эриадор',
      current: {
        dt: '05:17',
        sunrise: '06:53',
        sunset: '19:06',
        temp: 280.15,
        pressure: 1012,
        humidity: 90,
        clouds: 60,
        visibility: 1000,
        wind_speed: 2.0,
        weather: {
          id: 741,
          main: 'Atmosphere',
          description: 'fog',
        },
      },
      alert: null,
    },
    {
      geographic_name: 'Гондор',
      current: {
        dt: '07:17',
        sunrise: '06:33',
        sunset: '18:28',
        temp: 288.15,
        pressure: 1005,
        humidity: 90,
        clouds: 100,
        visibility: 2000,
        wind_speed: 10.5,
        weather: {
          id: 202,
          main: 'Thunderstorm',
          description: 'thunderstorm with heavy rain',
        },
      },
      alert: {
        sender_name: 'Королевская метеослужба короля Арагорна II',
        description: 'Предвещается наступление сильного шторма.',
      },
    },
    {
      geographic_name: 'Рохан',
      current: {
        dt: '08:17',
        sunrise: '06:55',
        sunset: '18:11',
        temp: 278.15,
        pressure: 1013,
        humidity: 75,
        clouds: 40,
        visibility: 1500,
        wind_speed: 2.5,
        weather: {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
        },
      },
      alert: null,
    },
    {
      geographic_name: 'Мордор',
      current: {
        dt: '13:27',
        sunrise: '05:58',
        sunset: '18:58',
        temp: 311.32,
        pressure: 980,
        humidity: 22,
        clouds: 100,
        visibility: 10000,
        wind_speed: 8.33,
        weather: {
          id: 762,
          main: 'Atmosphere',
          description: 'volcanic ash',
        },
      },
      alert: null,
    },
  ]
}
