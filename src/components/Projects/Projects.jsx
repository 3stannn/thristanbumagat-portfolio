import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ProjectArrow from "./ProjectArrow";
import projects, { projectPath } from "./projectsData";

// How long each screenshot stays up when a project has several.
const SLIDE_INTERVAL_MS = 2000;

function ProjectCard({ project, playing, active }) {
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
        <a
            className="project-card no-underline block shrink-0"
            href={projectPath(project.slug)}
            target="_blank"
            rel="noopener"
            aria-labelledby={`project-title-${project.slug}`}
            tabIndex={active ? 0 : -1}
            draggable={false}
        >
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
                            alt=""
                            draggable="false"
                            {...(i === 0 ? project.coverSize : undefined)}
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
                    <span id={`project-title-${project.slug}`} className="text-sm font-bold">
                        {project.title}
                    </span>
                    <span className="text-xs font-semibold text-(--muted)">
                        {project.tags.join(" · ")}
                    </span>
                </div>
                <span className="project-card-action inline-flex shrink-0 items-center gap-1 text-xs font-bold text-(--muted)">
                    View project <ProjectArrow />
                </span>
            </div>
        </a>
    );
}

function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    // True while most of the projects block is visible on screen.
    const [inView, setInView] = useState(false);
    const stickyRef = useRef(null);
    // distance: extra page height for the travel between the first and last card centers.
    // height/top: the pinned block's own height, and the offset that centers it on screen while pinned.
    const [layout, setLayout] = useState({ distance: 0, height: 0, top: 0 });
    const stickyTop = useRef(0);

    const railRef = useRef(null);
    const cardStops = useRef([0]);

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

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const rail = railRef.current;
        const cards = rail.querySelectorAll(".project-card");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // How quickly the cards catch up with the page scroll each frame (lower = softer, more glide).
        const ease = reduceMotion ? 1 : 0.09;
        let startOffset = 0;
        let target = 0;
        let current = 0;
        let frame = null;
        let mounted = true;

        const measure = () => {
            const height = stickyRef.current.offsetHeight;
            // Centered on screen, but never tucked under the fixed navbar.
            const navHeight = document.querySelector("nav")?.offsetHeight ?? 0;
            const top = Math.max(navHeight, (window.innerHeight - height) / 2);
            stickyTop.current = top;

            // Use the rendered widths because each screenshot can have a different aspect ratio.
            const railLeft = rail.getBoundingClientRect().left;
            const centers = Array.from(cards, (card) => {
                const { left, width } = card.getBoundingClientRect();
                return left - railLeft + width / 2;
            });
            const firstCenter = centers[0] ?? 0;
            startOffset = firstCenter - track.clientWidth / 2;
            const stops = centers.map((center) => center - firstCenter);
            cardStops.current = stops;
            setLayout({ distance: stops.at(-1) ?? 0, height, top });
        };

        const readTarget = () => {
            const max = cardStops.current.at(-1) ?? 0;
            const pinned = stickyTop.current - section.getBoundingClientRect().top;
            target = Math.min(max, Math.max(0, pinned));
        };

        const render = () => {
            current += (target - current) * ease;
            if (Math.abs(target - current) < 0.1) current = target;
            // Whole pixels keep screenshot edges crisp (no blurry half-pixel seams).
            rail.style.transform = `translate3d(${-Math.round(startOffset + current)}px, 0, 0)`;
            setActive(nearestIndex(current, cardStops.current));
            frame = current === target ? null : requestAnimationFrame(render);
        };

        const onScroll = () => {
            readTarget();
            if (frame === null) frame = requestAnimationFrame(render);
        };

        const onResize = () => {
            if (frame !== null) cancelAnimationFrame(frame);
            measure();
            readTarget();
            current = target;
            render();
        };

        onResize();
        // A direct hash visit can resolve before React mounts. Wait for font metrics
        // so wrapped text on narrow screens has settled before calculating the stop.
        if (window.location.hash === "#projects") {
            document.fonts.ready.then(() => {
                if (!mounted || window.location.hash !== "#projects") return;
                onResize();
                window.scrollTo({ top: pinStart(), behavior: "instant" });
            });
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        // Re-measure when card widths change (e.g. once screenshots finish loading).
        const observer = new ResizeObserver(onResize);
        observer.observe(stickyRef.current);
        cards.forEach((card) => observer.observe(card));
        return () => {
            mounted = false;
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
        window.scrollTo({ top: pinStart() + cardStops.current[clamped], behavior: "smooth" });
    };

    const onKeyDown = (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        trackRef.current.focus({ preventScroll: true });
        scrollToIndex(active + (e.key === "ArrowRight" ? 1 : -1));
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
                                <ProjectArrow direction="left" />
                            </button>
                            <button
                                type="button"
                                className="project-nav"
                                onClick={() => scrollToIndex(active + 1)}
                                disabled={active === projects.length - 1}
                                aria-label="Next project"
                            >
                                <ProjectArrow />
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
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                playing={inView}
                                active={index === active}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex flex-row justify-center gap-2">
                    {projects.map((project, i) => (
                        <button
                            key={project.slug}
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
