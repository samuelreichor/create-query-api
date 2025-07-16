# Create Query API Project

Create a headless Craft CMS project with the Query API in seconds. 

## Usage

Make sure you have npx installed (npx is shipped by default since npm `5.2.0`)

```bash
npx create-query-api <my-project-name>
```

## CLI Options

### `projectName`
The name of the project to be created. Can be passed as a positional argument or will be prompted interactively.

### `--template <template>`
Choose a template for the new project. Possible values are:

- `vue` - Vue Starter
- `nuxt` - Nuxt Starter
- `react-vite` - React Vite Starter
- `next` - Next.js Starter

If no template is provided, an interactive selection will be shown.

### `--dry-run`
Runs the command in dry-run mode. No changes will be made, only a preview of the actions will be shown.

### `--help`
Shows help and all available options.
