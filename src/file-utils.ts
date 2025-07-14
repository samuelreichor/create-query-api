import { downloadTemplate } from 'giget'
import { log } from '@clack/prompts'

export async function download(repo: string, branch: string, dest: string) {
  log.info(`Downloading: https://github.com/${repo}#${branch}`)
  await downloadTemplate(`${repo}#${branch}`, {
    provider: 'github',
    dir: dest,
    force: true,
  })
}
