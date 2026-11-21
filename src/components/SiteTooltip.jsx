import { useEffect, useRef } from "react";

const TRIGGER = "a[href], [data-tooltip]";
const EDGE = 8;
const POINTER_OFFSET_X = 16;
const POINTER_CLEARANCE_BELOW = 14;

function SiteTooltip() {
    const tooltipRef = useRef(null);

    useEffect(() => {
        const tooltip = tooltipRef.current;
        const bubble = tooltip.firstElementChild;
        const listeners = new AbortController();
        const options = { signal: listeners.signal };
        let hovered = null;
        let focused = null;
        let active = null;
        let dismissed = null;
        let pointer = null;
        let frame = 0;
        let timer;

        function place() {
            const rect = active.getBoundingClientRect();
            const { clientWidth: width, clientHeight: height } = document.documentElement;
            const inView = rect.width && rect.height && rect.bottom > 0 && rect.top < height
                && rect.right > 0 && rect.left < width;

            const label = active.dataset.tooltip || active.getAttribute("aria-label") || active.textContent.trim();
            if (!inView || !label) {
                tooltip.dataset.visible = "false";
                return;
            }

            if (bubble.textContent !== label) bubble.textContent = label;
            const { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip;
            const point = active === pointer?.trigger && (active === hovered || active !== focused) ? pointer : null;
            const anchorTop = point?.y ?? rect.top;
            const anchorBottom = point ? point.y + POINTER_CLEARANCE_BELOW : rect.bottom;
            const spaceAbove = anchorTop - EDGE;
            const spaceBelow = height - anchorBottom - EDGE;
            const above = spaceAbove >= tipHeight || (spaceBelow < tipHeight && spaceAbove >= spaceBelow);
            const maxLeft = width - tipWidth - EDGE;
            let preferredLeft = (rect.left + rect.right - tipWidth) / 2;
            if (point) {
                const rightOfPointer = point.x + POINTER_OFFSET_X;
                const leftOfPointer = point.x - tipWidth - EDGE;
                preferredLeft = rightOfPointer > maxLeft && leftOfPointer >= EDGE ? leftOfPointer : rightOfPointer;
            }
            const left = Math.max(EDGE, Math.min(preferredLeft, maxLeft));
            const top = Math.max(EDGE, Math.min(above ? anchorTop - tipHeight : anchorBottom, height - tipHeight - EDGE));

            tooltip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            tooltip.dataset.placement = above ? "above" : "below";
            tooltip.dataset.visible = "true";
        }

        const labelObserver = new MutationObserver(place);

        function hide() {
            labelObserver.disconnect();
            active = null;
            tooltip.dataset.visible = "false";
        }

        function update() {
            clearTimeout(timer);
            if (dismissed !== hovered && dismissed !== focused) dismissed = null;
            const trigger = hovered || focused;

            if (!trigger || trigger === dismissed) {
                // Allow time to cross from the trigger into the tooltip.
                timer = setTimeout(hide, 150);
                return;
            }

            if (trigger === active) {
                place();
                return;
            }

            const show = () => {
                labelObserver.disconnect();
                active = trigger;
                labelObserver.observe(trigger, { attributeFilter: ["data-tooltip", "aria-label"] });
                place();
            };

            if (tooltip.dataset.visible === "true" || trigger === focused) show();
            else timer = setTimeout(show, 160);
        }

        function dismiss() {
            dismissed = hovered || focused;
            clearTimeout(timer);
            hide();
        }

        function onPointerOver(event) {
            if (event.pointerType === "touch") return;
            if (tooltip.contains(event.target)) {
                hovered = active;
                update();
                return;
            }

            const trigger = event.target.closest?.(TRIGGER);
            if (!trigger || (trigger === hovered && tooltip.dataset.tracking === "true")) return;
            hovered = trigger;
            pointer = { trigger, x: event.clientX, y: event.clientY };
            tooltip.dataset.tracking = "true";
            update();
        }

        function onPointerMove(event) {
            if (event.pointerType === "touch") return;
            if (!hovered?.contains(event.target)) {
                if (focused?.contains(event.target)) onPointerOver(event);
                return;
            }
            pointer = { trigger: hovered, x: event.clientX, y: event.clientY };
            if (hovered !== active || frame) return;

            frame = requestAnimationFrame(() => {
                frame = 0;
                if (active && active === hovered) place();
            });
        }

        function onPointerOut(event) {
            if (event.pointerType === "touch" || !hovered) return;
            if (hovered.contains(event.relatedTarget) || tooltip.contains(event.relatedTarget)) return;
            if (!hovered.contains(event.target) && !tooltip.contains(event.target)) return;
            hovered = null;
            tooltip.dataset.tracking = "false";
            update();
        }

        function onFocusIn(event) {
            if (!event.target.matches(TRIGGER) || !event.target.matches(":focus-visible")) return;
            focused = event.target;
            hovered = null;
            pointer = null;
            tooltip.dataset.tracking = "false";
            update();
        }

        function onFocusOut(event) {
            if (event.target !== focused) return;
            focused = null;
            update();
        }

        function onViewportChange() {
            if (active) place();
        }

        document.addEventListener("pointerover", onPointerOver, options);
        document.addEventListener("pointerout", onPointerOut, options);
        document.addEventListener("pointermove", onPointerMove, { ...options, passive: true });
        document.addEventListener("focusin", onFocusIn, options);
        document.addEventListener("focusout", onFocusOut, options);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") dismiss();
        }, options);
        document.addEventListener("click", (event) => {
            if (event.target.closest?.("a[href]")) dismiss();
        }, options);
        window.addEventListener("scroll", onViewportChange, { ...options, capture: true, passive: true });
        window.addEventListener("resize", onViewportChange, options);

        return () => {
            listeners.abort();
            cancelAnimationFrame(frame);
            clearTimeout(timer);
            hide();
        };
    }, []);

    return (
        // The links and controls already provide their own accessible names.
        <div ref={tooltipRef} className="site-tooltip" role="tooltip" aria-hidden="true">
            <span className="site-tooltip-bubble" />
        </div>
    );
}

export default SiteTooltip;
