#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { intro, outro, text, log, select, spinner, note } from '@clack/prompts'
import color from 'picocolors';
import path from 'node:path'
import fs from 'node:fs'
import { setTimeout } from 'node:timers/promises';
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
    intro(`${color.cyan('Thanks for trying out the Query API!')}`)

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

    const s = spinner()
    s.start(`Downloading template for '${selectedTemplate.name}'...`)
    if (args.dryRun) {
      await setTimeout(1000);
    } else {
      await download(selectedTemplate.repositoryLink, selectedTemplate.branch, targetDir)
      // Set project name in .ddev/config.yaml
      const ddevConfigPath = path.join(targetDir, '.ddev', 'config.yaml');
      if (fs.existsSync(ddevConfigPath)) {
        let configContent = fs.readFileSync(ddevConfigPath, 'utf8');
        configContent = configContent.replace(/^name:.*$/m, `name: ${projectName}`);
        fs.writeFileSync(ddevConfigPath, configContent, 'utf8');
      }
    }
    s.stop(`Template ${selectedTemplate.name} downloaded successfully!`)

    const nextSteps = `1. Navigate to your project: ${color.cyan(`cd ./${projectName}`)}\n2. Run the setup script: ${color.cyan('./scripts/setup.sh')}`
    note(nextSteps, 'Next Steps')
    outro(`Problems? ${color.underline(color.cyan('https://github.com/samuelreichor/create-query-api/issues/new'))}`)
  },
})

runMain(main)
