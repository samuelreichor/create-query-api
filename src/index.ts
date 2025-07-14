#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { intro, outro, text, log, select, spinner } from '@clack/prompts'
import path from 'node:path'
import fs from 'node:fs'
import { templates } from './templates'
import { download } from './file-utils'

const main = defineCommand({
  meta: {
    name: 'create-query-api',
    version: '0.0.0',
    description: 'A CLI tool for quickly starting a new Query API project',
  },
  args: {
    projectName: {
      type: 'positional',
      description: 'The name of the project to create.',
      required: false,
    },
    template: {
      type: 'string',
      description: 'The template to use.',
    },
    dryRun: {
      type: 'boolean',
      description: 'Run the command in dry-run mode.',
    },
  },
  async run({ args }) {
    if (args.dryRun) {
      log.info('Dry run enabled. No changes will be made.')
    }
    intro('Welcome to create-query-api!')

    let projectName = args.projectName
    if (!projectName) {
      projectName = await text({
        message: 'What is the name of your project?',
        placeholder: 'my-query-api-project',
      }) as string
    }

    const targetDir = path.resolve(process.cwd(), projectName as string)

    if (fs.existsSync(targetDir)) {
      log.error(`Directory '${projectName}' already exists. Please choose a different name.`)
      outro('Aborted')
      process.exit(1)
    }

    let selectedTemplateValue = args.template
    if (selectedTemplateValue) {
      const templateExists = templates.some(t => t.value === selectedTemplateValue)
      if (!templateExists) {
        log.error(`Invalid template '${selectedTemplateValue}'. Please choose one of the available options.`)
        outro('Aborted')
        process.exit(1)
      }
    } else {
      selectedTemplateValue = await select({
        message: 'Which template would you like to use?',
        options: templates.map(t => ({ value: t.value, label: t.name })),
      }) as string
    }

    const selectedTemplate = templates.find(t => t.value === selectedTemplateValue)!

    if (args.dryRun) {
      log.info(`Project directory would be created at: ${targetDir}`)
      log.info(`Template to be used: ${selectedTemplate.name}`)
      log.info('Files and folders to be copied from the template are not listed in dry-run mode.')
      outro('Dry run complete.')
      return
    }

    const s = spinner()
    s.start(`Downloading template "${selectedTemplate.name}"...`)
    await download(selectedTemplate.repositoryLink, selectedTemplate.branch, targetDir)
    s.stop('Template downloaded successfully!')

    outro('Done!')
  },
})

runMain(main)
