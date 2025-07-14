export type Template = {
  name: string
  value: string
  repositoryLink: string
  branch: string
}

export const templates: Template[] = [
  {
    name: 'Vue',
    value: 'vueJs',
    repositoryLink: 'https://github.com/samuelreichor/query-api-craft-starter',
    branch: 'examples/vue',
  },
  {
    name: 'Nuxt',
    value: 'nuxt',
    repositoryLink: 'https://github.com/samuelreichor/query-api-craft-starter',
    branch: 'examples/nuxt',
  },
  {
    name: 'React Vite',
    value: 'reactJs',
    repositoryLink: 'https://github.com/samuelreichor/query-api-craft-starter',
    branch: 'examples/react-vite',
  },
  {
    name: 'Next.js',
    value: 'nextJs',
    repositoryLink: 'https://github.com/samuelreichor/query-api-craft-starter',
    branch: 'examples/next',
  },
]