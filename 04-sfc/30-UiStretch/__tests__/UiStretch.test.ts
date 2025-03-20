import { describe, it, expect } from 'vitest'
import fs from 'node:fs/promises'
import UiStretch from '@/UiStretch.vue'

describe('sfc/UiStretch', () => {
  it('использует Scoped CSS', async () => {
    const solutionText = await fs.readFile(UiStretch.__file, 'utf8')
    expect(solutionText).toMatch(/<style.*scoped.*>/ms)
  })

  it('не изолирует стили содержимого', async () => {
    const solutionText = await fs.readFile(UiStretch.__file, 'utf8')
    const matched = /<style.*>.*(?:slotted|deep).*<\/style>/ms.test(solutionText)
    expect(matched).toBe(true)
  })
})
