import { useEffect, useRef } from "react";

// a white dot that follows the mouse; mix-blend-mode: difference inverts whatever is under it
const HOVER_TARGETS = "a, button, [role='button'], input, textarea, select, label, .project-dot";

function Cursor() {
    const dotRef = useRef(null);

    useEffect(() => {
        // only on devices with a real mouse
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const dot = dotRef.current;
        const root = document.documentElement;
        root.classList.add("has-custom-cursor");

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const target = { x: -100, y: -100 };
        const pos = { x: -100, y: -100 };
        let frame = 0;

        const render = () => {
            const ease = reduceMotion ? 1 : 0.25;
            pos.x += (target.x - pos.x) * ease;
            pos.y += (target.y - pos.y) * ease;
            dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
            if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
                frame = requestAnimationFrame(render);
            } else {
                frame = 0;
            }
        };

        const onLeave = () => dot.classList.remove("is-visible", "is-pressed", "is-project-hover");
        const onMove = (e) => {
            if (e.pointerType === "touch") {
                onLeave();
                return;
            }
            target.x = e.clientX;
            target.y = e.clientY;
            dot.classList.add("is-visible");
            dot.classList.toggle("is-hovering", !!e.target.closest?.(HOVER_TARGETS));
            dot.classList.toggle("is-project-hover", !!e.target.closest?.(".project-card"));
            if (!frame) frame = requestAnimationFrame(render);
        };
        const onDown = () => dot.classList.add("is-pressed");
        const onUp = () => dot.classList.remove("is-pressed");

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        window.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);

        return () => {
            cancelAnimationFrame(frame);
            root.classList.remove("has-custom-cursor");
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onMove);
            document.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };
    }, []);

    return (
        <div ref={dotRef} className="custom-cursor" aria-hidden="true">
            <span className="custom-cursor-dot" />
            <span className="custom-cursor-project">View project</span>
        </div>
    );
}

export default Cursor;
