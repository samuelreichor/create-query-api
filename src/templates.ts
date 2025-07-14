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
    value: 'reactJs',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'examples/react-vite',
  },
  {
    name: 'Next.js',
    value: 'nextJs',
    repositoryLink: 'samuelreichor/query-api-craft-starter',
    branch: 'examples/next',
  },
]