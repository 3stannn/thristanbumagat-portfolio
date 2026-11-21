import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './layout/Navbar.jsx'
import App from './App.jsx'
import Footer from './layout/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import SiteTooltip from './components/SiteTooltip.jsx'
import ProjectPage from './components/Projects/ProjectPage.jsx'
import projects, { projectPath } from './components/Projects/projectsData.js'

const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/')
const projectIndex = projects.findIndex(({ slug }) => projectPath(slug) === path)
const project = projects[projectIndex]
const nextProject = projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : undefined

if (project) document.title = `${project.title} | Thristan Bumagat`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {project ? (
      <ProjectPage project={project} nextProject={nextProject} />
    ) : (
      <>
        <Navbar />
        <App />
      </>
    )}
    <Cursor />
    <Footer />
    <SiteTooltip />
  </StrictMode>,
)
