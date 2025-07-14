import { describe, it, expect, vi } from 'vitest'
import { download } from './file-utils'
import { downloadTemplate } from 'giget'

vi.mock('giget', () => ({
  downloadTemplate: vi.fn(),
}))

describe('download', () => {
  it('should call downloadTemplate with the correct arguments', async () => {
    const repo = 'user/repo'
    const branch = 'main'
    const dest = '/tmp/dest'

    await download(repo, branch, dest)

    expect(downloadTemplate).toHaveBeenCalledWith('user/repo#main', {
      dir: dest,
      force: true,
      provider: 'github',
    })
  })
})
