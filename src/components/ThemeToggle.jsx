import { useRef, useState } from "react";
import { flushSync } from "react-dom";

function getInitialTheme() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
        localStorage.setItem("theme", theme);
    } catch {
        /* storage unavailable: theme just won't persist */
    }
}

function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);
    const buttonRef = useRef(null);

    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        const update = () => {
            flushSync(() => setTheme(next));
            applyTheme(next);
        };

        const root = document.documentElement;
        // no element color transitions while switching, so nothing fades mid-reveal
        root.classList.add("theme-switching");
        const done = () => root.classList.remove("theme-switching");

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!document.startViewTransition || reduceMotion) {
            update();
            setTimeout(done, 50);
            return;
        }

        // circle grows out of the button until it covers the farthest corner of the screen
        const rect = buttonRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
        );
        root.style.setProperty("--vt-x", `${x}px`);
        root.style.setProperty("--vt-y", `${y}px`);
        root.style.setProperty("--vt-r", `${radius}px`);

        const transition = document.startViewTransition(update);
        transition.finished.finally(done);
        // safety net: never leave transitions frozen if the view transition stalls
        setTimeout(done, 1000);
    };

    const isDark = theme === "dark";

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={toggle}
            className="theme-toggle"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
        >
            {isDark ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                </svg>
            )}
        </button>
    );
}

export default ThemeToggle;
