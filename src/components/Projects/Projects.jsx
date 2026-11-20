import { useEffect, useRef, useState } from "react";
import projects from "./projectsData";

function Arrow({ direction = "right" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={direction === "left" ? "rotate-180" : ""}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

// How long each screenshot stays up when a project has several.
const SLIDE_INTERVAL_MS = 2000;

function ProjectCard({ project, playing }) {
    // `image` can be one screenshot or an array of them.
    const images = [project.image ?? []].flat();
    const [shown, setShown] = useState(0);

    // Only rotate while the Projects section is on screen; otherwise rest on the first screenshot.
    useEffect(() => {
        if (!playing || images.length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setShown((i) => (i + 1) % images.length), SLIDE_INTERVAL_MS);
        return () => {
            clearInterval(id);
            setShown(0); // start from the first screenshot next time the section comes into view
        };
    }, [images.length, playing]);
    const current = playing ? shown : 0;

    return (
        <article className="project-card shrink-0">
            <div
                className={`project-media relative overflow-hidden rounded-2xl ${images.length ? "" : "is-placeholder"}`}
                // Real screenshots get no background, so no color can show around their rounded edges.
                style={{ background: images.length ? undefined : project.background }}
            >
                {images.length ? (
                    // The first screenshot sets the card's width; the rest are stacked on top and swap instantly.
                    images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt={i === 0 ? project.title : ""}
                            draggable="false"
                            className={`project-slide ${i === 0 ? "block" : "absolute inset-0 h-full w-full object-cover"} ${i === current ? "is-shown" : ""}`}
                        />
                    ))
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-4xl font-bold tracking-tight text-[#F6F6F6]">
                            {project.title}
                        </span>
                    </div>
                )}
            </div>
            <div className="project-meta mt-3 flex flex-row items-start justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-sm font-bold">{project.title}</span>
                    <span className="text-xs font-semibold text-(--muted)">
                        {project.tags.join(" · ")}
                    </span>
                </div>
                {project.link && (
                    <a
                        className="no-underline inline-flex shrink-0 items-center gap-1 text-xs font-bold"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View project <Arrow />
                    </a>
                )}
            </div>
        </article>
    );
}

function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    // True while most of the projects block is visible on screen.
    const [inView, setInView] = useState(false);
    const stickyRef = useRef(null);
    // distance: extra page height for the horizontal travel (one card-width per card after the first).
    // height/top: the pinned block's own height, and the offset that centers it on screen while pinned.
    const [layout, setLayout] = useState({ distance: 0, height: 0, top: 0 });
    const stickyTop = useRef(0);

    const railRef = useRef(null);

    // Horizontal position of each card's left edge, relative to the first card.
    // Cards have different widths, so each one gets its own stop.
    const cardStops = () => {
        const cards = railRef.current?.querySelectorAll(".project-card");
        if (!cards?.length) return [0];
        const first = cards[0].offsetLeft;
        return [...cards].map((card) => card.offsetLeft - first);
    };

    const nearestIndex = (x, stops) => {
        let best = 0;
        stops.forEach((stop, i) => {
            if (Math.abs(stop - x) < Math.abs(stops[best] - x)) best = i;
        });
        return best;
    };

    // Page Y at which the section pins (its top reaches the sticky offset).
    const pinStart = () =>
        sectionRef.current.getBoundingClientRect().top + window.scrollY - stickyTop.current;

    useEffect(() => {
        const section = sectionRef.current;
        const rail = railRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // How quickly the cards catch up with the page scroll each frame (lower = softer, more glide).
        const ease = reduceMotion ? 1 : 0.09;
        let target = 0;
        let current = 0;
        let frame = null;

        const measure = () => {
            const height = stickyRef.current.offsetHeight;
            // Centered on screen, but never tucked under the fixed navbar.
            const navHeight = document.querySelector("nav")?.offsetHeight ?? 0;
            const top = Math.max(navHeight, (window.innerHeight - height) / 2);
            stickyTop.current = top;
            const stops = cardStops();
            setLayout({ distance: stops[stops.length - 1], height, top });
        };

        const readTarget = () => {
            const stops = cardStops();
            const max = stops[stops.length - 1];
            const pinned = stickyTop.current - section.getBoundingClientRect().top;
            target = Math.min(max, Math.max(0, pinned));
        };

        const render = () => {
            current += (target - current) * ease;
            if (Math.abs(target - current) < 0.1) current = target;
            // Whole pixels keep screenshot edges crisp (no blurry half-pixel seams).
            rail.style.transform = `translate3d(${-Math.round(current)}px, 0, 0)`;
            setActive(nearestIndex(current, cardStops()));
            frame = current === target ? null : requestAnimationFrame(render);
        };

        const onScroll = () => {
            readTarget();
            if (frame === null) frame = requestAnimationFrame(render);
        };

        const onResize = () => {
            measure();
            readTarget();
            current = target;
            render();
        };

        measure();
        readTarget();
        current = target;
        render();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        // Re-measure when card widths change (e.g. once screenshots finish loading).
        const observer = new ResizeObserver(onResize);
        observer.observe(rail);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            observer.disconnect();
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.6 },
        );
        observer.observe(stickyRef.current);
        return () => observer.disconnect();
    }, []);

    const scrollToIndex = (index) => {
        const clamped = Math.max(0, Math.min(projects.length - 1, index));
        window.scrollTo({ top: pinStart() + cardStops()[clamped], behavior: "smooth" });
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollToIndex(active + 1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollToIndex(active - 1);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="mt-24"
            style={{
                height: layout.height ? layout.height + layout.distance : undefined,
                // the "Projects" nav link lands exactly where the cards pin, on the first card
                scrollMarginTop: layout.top,
            }}
        >
            <div ref={stickyRef} className="sticky" style={{ top: layout.top }}>
                <div className="max-w-2xl mx-auto w-full px-8">
                    <div className="flex flex-row items-center justify-between">
                        <span className="font-bold text-sm">Selected Projects</span>
                        <div className="flex flex-row items-center gap-2">
                            <button
                                type="button"
                                className="project-nav"
                                onClick={() => scrollToIndex(active - 1)}
                                disabled={active === 0}
                                aria-label="Previous project"
                            >
                                <Arrow direction="left" />
                            </button>
                            <button
                                type="button"
                                className="project-nav"
                                onClick={() => scrollToIndex(active + 1)}
                                disabled={active === projects.length - 1}
                                aria-label="Next project"
                            >
                                <Arrow />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className="project-track mt-4"
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    role="region"
                    aria-label="Selected projects"
                >
                    <div ref={railRef} className="project-rail flex gap-2">
                        {projects.map((project) => (
                            <ProjectCard key={project.title} project={project} playing={inView} />
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex flex-row justify-center gap-2">
                    {projects.map((project, i) => (
                        <button
                            key={project.title}
                            type="button"
                            onClick={() => scrollToIndex(i)}
                            aria-label={`Go to ${project.title}`}
                            className={`project-dot ${i === active ? "is-active" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
