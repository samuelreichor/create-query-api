import { downloadTemplate } from 'giget'
import { log } from '@clack/prompts'

export async function download(repo: string, branch: string, dest: string) {
  await downloadTemplate(`${repo}#${branch}`, {
    provider: 'github',
    dir: dest,
    force: true,
  })
}
