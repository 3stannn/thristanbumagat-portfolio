import { useEffect, useRef } from "react";

function Cursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const root = document.documentElement;
        const finePointer = window.matchMedia("(any-pointer: fine) and (any-hover: hover)");
        const listeners = new AbortController();
        const options = { signal: listeners.signal };

        const hide = () => {
            cursor.classList.remove("is-visible", "is-pressed");
            root.classList.remove("has-custom-cursor");
        };

        const onMove = (event) => {
            if (!finePointer.matches || event.pointerType === "touch") {
                hide();
                return;
            }

            cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
            if (!cursor.classList.contains("is-visible")) {
                cursor.classList.add("is-visible");
                root.classList.add("has-custom-cursor");
            }
        };

        window.addEventListener("pointermove", onMove, { ...options, passive: true });
        window.addEventListener("pointerover", onMove, { ...options, passive: true });
        window.addEventListener("pointerdown", (event) => {
            onMove(event);
            if (cursor.classList.contains("is-visible")) cursor.classList.add("is-pressed");
        }, options);
        window.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"), options);
        window.addEventListener("pointercancel", hide, options);
        window.addEventListener("blur", hide, options);
        document.addEventListener("pointerleave", hide, options);
        finePointer.addEventListener("change", hide, options);

        return () => {
            listeners.abort();
            hide();
        };
    }, []);

    return (
        <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
            <svg className="custom-cursor-arrow" width="18" height="20" viewBox="-1 -1 18 20" focusable="false">
                <path d="M.4 1.5a1 1 0 0 1 1.4-1.1l12.4 5.2a1.15 1.15 0 0 1 .05 2.1L8.8 10.1l-2.5 5.4a1.15 1.15 0 0 1-2.15-.16Z" />
            </svg>
        </div>
    );
}

export default Cursor;
