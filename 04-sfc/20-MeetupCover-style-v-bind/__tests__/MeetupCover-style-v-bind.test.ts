import { describe, it, expect } from 'vitest'
import fs from 'fs/promises'
import MeetupCover from '../MeetupCover.vue'

describe('sfc/MeetupCover-style-v-bind', () => {
  it('реализован через v-bind в CSS', async () => {
    const solutionText = await fs.readFile(MeetupCover.__file!, 'utf8')
    expect(solutionText).toMatch(/<style.*>.*v-bind.*<\/style>/ms)
  })
})
