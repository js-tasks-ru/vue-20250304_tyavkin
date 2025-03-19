import type { MeetupDTO } from './meetups.types.ts'

const API_URL = 'https://course-vue.javascript.ru/api'

/**
 * Получить данные митапа по его ID
 * @param meetupId - ID митапа
 * @returns Данные митапа
 */
export async function getMeetup(meetupId: number): Promise<MeetupDTO> {
  const response = await fetch(`${API_URL}/meetups/${meetupId}`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}
