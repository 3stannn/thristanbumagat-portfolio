import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import projects, { projectPath } from './src/components/Projects/projectsData.js'

const SITE_URL = 'https://thristanbumagat.vercel.app'

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Replace the content/href of a meta or link tag identified by `attr="key"`.
function setTag(html, attr, key, value, valueAttr = 'content') {
  const tag = new RegExp(`(<(?:meta|link)\\s[^>]*${attr}="${key}"[^>]*?${valueAttr}=")[^"]*(")`, 's')
  return html.replace(tag, `$1${escapeAttr(value)}$2`)
}

// Find the emitted file for a source asset so its hashed path can be used as an absolute preview image.
function findAssetFile(bundle, sourceUrl) {
  if (!sourceUrl?.startsWith('file:')) return undefined
  const name = decodeURIComponent(new URL(sourceUrl).pathname).split('/').pop()
  const asset = Object.values(bundle).find(
    (file) =>
      file.type === 'asset' &&
      [...(file.originalFileNames ?? []), ...(file.names ?? [])].some((n) => n.split('/').pop() === name),
  )
  return asset?.fileName
}

const projectPages = {
  name: 'project-pages',
  apply: 'build',
  generateBundle: {
    order: 'post',
    handler(_, bundle) {
      const page = String(bundle['index.html'].source)
      const siteName = 'Thristan Dave Bumagat'

      // Give each project a real entry file so direct visits also work on static hosts,
      // with its own title, description, URL and preview image for link unfurls.
      for (const project of projects) {
        const path = projectPath(project.slug)
        const url = `${SITE_URL}${path}`
        const title = `${project.title} | ${siteName}`
        const imageFile = findAssetFile(bundle, [project.image ?? []].flat()[0])

        let html = page.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
        html = setTag(html, 'name', 'description', project.summary)
        html = setTag(html, 'rel', 'canonical', url, 'href')
        html = setTag(html, 'property', 'og:type', 'article')
        html = setTag(html, 'property', 'og:url', url)
        html = setTag(html, 'property', 'og:title', title)
        html = setTag(html, 'property', 'og:description', project.summary)
        html = setTag(html, 'name', 'twitter:title', title)
        html = setTag(html, 'name', 'twitter:description', project.summary)
        if (imageFile) {
          const image = `${SITE_URL}/${imageFile}`
          const alt = `${project.title} screenshot`
          const { width = 1920, height = 1080 } = project.coverSize ?? {}
          html = setTag(html, 'property', 'og:image', image)
          html = setTag(html, 'property', 'og:image:width', width)
          html = setTag(html, 'property', 'og:image:height', height)
          html = setTag(html, 'property', 'og:image:alt', alt)
          html = setTag(html, 'name', 'twitter:image', image)
          html = setTag(html, 'name', 'twitter:image:alt', alt)
        }

        this.emitFile({ type: 'asset', fileName: `${path.slice(1)}index.html`, source: html })
      }
    },
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), projectPages],
})
