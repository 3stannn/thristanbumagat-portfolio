import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import projects, { projectPath } from './src/components/Projects/projectsData.js'

const projectPages = {
  name: 'project-pages',
  apply: 'build',
  generateBundle: {
    order: 'post',
    handler(_, bundle) {
      const page = bundle['index.html']
      // Give each project a real entry file so direct visits also work on static hosts.
      for (const { slug } of projects) {
        this.emitFile({
          type: 'asset',
          fileName: `${projectPath(slug).slice(1)}index.html`,
          source: page.source,
        })
      }
    },
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), projectPages],
})
