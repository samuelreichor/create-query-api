export type Template = {
  name: string
  value: string
  repositoryLink: string
  branch: string
}

export const templates: Template[] = [
  {
    name: 'Vue',
    value: 'vue',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'examples/vue',
  },
  {
    name: 'Nuxt',
    value: 'nuxt',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'examples/nuxt',
  },
  {
    name: 'React Vite',
    value: 'react-vite',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'examples/react-vite',
  },
  {
    name: 'Next.js',
    value: 'next',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'examples/next',
  },
  {
    name: 'Craft CMS only',
    value: 'craft-only',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'main',
  },
]