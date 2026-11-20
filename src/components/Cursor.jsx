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

        const onMove = (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
            dot.classList.add("is-visible");
            dot.classList.toggle("is-hovering", !!e.target.closest?.(HOVER_TARGETS));
            if (!frame) frame = requestAnimationFrame(render);
        };
        const onLeave = () => dot.classList.remove("is-visible");
        const onDown = () => dot.classList.add("is-pressed");
        const onUp = () => dot.classList.remove("is-pressed");

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        window.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);

        return () => {
            cancelAnimationFrame(frame);
            root.classList.remove("has-custom-cursor");
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
        };
    }, []);

    return (
        <div ref={dotRef} className="custom-cursor" aria-hidden="true">
            <span />
        </div>
    );
}

export default Cursor;
