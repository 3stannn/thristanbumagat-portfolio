import NavbarBlur from "../../layout/NavbarBlur";
import ThemeToggle from "../ThemeToggle";
import ProjectArrow from "./ProjectArrow";
import { projectPath } from "./projectsData";

export default function ProjectPage({ project, nextProject }) {
    const images = [project.image ?? []].flat();

    return (
        <>
            <nav aria-label="Project navigation" className="project-navbar sticky top-0">
                <NavbarBlur />
                <div className="relative flex min-h-18 items-center justify-between gap-4 px-6 py-3 sm:px-8">
                    <a className="no-underline nav-link inline-flex items-center gap-2 text-sm font-bold" href="/#projects">
                        <ProjectArrow direction="left" />
                        All projects
                    </a>
                    <div className="flex items-center gap-3 sm:gap-5">
                        {project.site && (
                            <a
                                className="no-underline nav-link inline-flex items-center gap-1.5 text-sm font-bold"
                                href={project.site}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Visit site <ProjectArrow direction="external" />
                            </a>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <main className="project-page">
                <header className="mx-auto max-w-2xl px-4 pt-8 sm:px-8 sm:pt-12">
                    <h1 className="text-3xl leading-tight font-bold tracking-tight max-sm:text-balance sm:text-5xl">
                        {project.title}
                    </h1>
                    <p className="mt-2 text-xs font-semibold text-(--project-muted)">
                        {[project.role, project.period].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-8 leading-relaxed text-sm">{project.summary}</p>
                    <p className="mt-8 text-xs font-semibold text-(--project-muted)">{project.tags.join(" · ")}</p>
                </header>

                {images.length > 0 && (
                    <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 px-6 sm:mt-12 sm:px-8">
                        {images.map((src, index) => (
                            <img
                                key={src}
                                className="block w-full rounded-2xl"
                                src={src}
                                alt={`${project.title} screenshot${images.length > 1 ? ` ${index + 1}` : ""}`}
                                {...(index === 0 ? project.coverSize : undefined)}
                                loading={index > 0 ? "lazy" : undefined}
                            />
                        ))}
                    </div>
                )}

                <section className="mx-auto mt-8 max-w-2xl px-4 sm:mt-12 sm:px-8" aria-labelledby="project-contributions">
                    <h2 id="project-contributions" className="text-2xl font-bold tracking-tight">What I built</h2>
                    <div className="mt-8 space-y-2 text-sm leading-relaxed">
                        {project.contributions.map((contribution) => <p key={contribution}>{contribution}</p>)}
                    </div>
                </section>

                {nextProject && (
                    <div className="mx-auto mt-12 max-w-2xl px-4 sm:mt-12 sm:px-8">
                        <a
                            className="project-next no-underline flex items-center justify-between gap-4 border-t border-(--line) py-6"
                            href={projectPath(nextProject.slug)}
                        >
                            <span className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-(--project-muted)">Next project</span>
                                <span className="text-sm font-bold tracking-tight">{nextProject.title}</span>
                            </span>
                            <span className="project-nav shrink-0">
                                <ProjectArrow />
                            </span>
                        </a>
                    </div>
                )}
            </main>
        </>
    );
}
