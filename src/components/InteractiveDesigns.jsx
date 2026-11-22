import { useEffect, useRef, useState } from "react";
import tallyTicket from "../assets/projects/tally/tallysuggestion.mp4";
import tallyLicense from "../assets/projects/tally/tally-license-ticket.mp4";

function DesignPreview({ title, src, aspect }) {
    const inlineVideoRef = useRef(null);
    const dialogRef = useRef(null);
    const dialogVideoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (!isHovered) return;

        function dismissOnEscape(event) {
            if (event.key === "Escape") setIsHovered(false);
        }

        window.addEventListener("keydown", dismissOnEscape);
        return () => window.removeEventListener("keydown", dismissOnEscape);
    }, [isHovered]);

    function toggleSound() {
        const video = inlineVideoRef.current;
        video.muted = !video.muted;
        setIsMuted(video.muted);

        if (!video.muted && video.paused) video.play().catch(() => {});
    }

    function openPreview() {
        const inlineVideo = inlineVideoRef.current;
        const dialogVideo = dialogVideoRef.current;

        setIsHovered(false);
        dialogRef.current.showModal();
        inlineVideo.pause();
        dialogVideo.currentTime = inlineVideo.currentTime;
        dialogVideo.play().catch(() => {});
    }

    function resumeInlineVideo() {
        const inlineVideo = inlineVideoRef.current;
        const dialogVideo = dialogVideoRef.current;

        dialogVideo.pause();
        inlineVideo.currentTime = dialogVideo.currentTime;
        inlineVideo.play().catch(() => {});
    }

    return (
        <div className="w-80 min-w-0 max-w-full" style={{ "--preview-ratio": aspect }}>
            <button
                type="button"
                className="design-preview-trigger my-4 block w-full cursor-zoom-in rounded-4xl focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`Enlarge ${title}`}
                aria-haspopup="dialog"
                data-hovered={isHovered}
                onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setIsHovered(true);
                }}
                onPointerLeave={() => setIsHovered(false)}
                onClick={openPreview}
            >
                <video
                    ref={inlineVideoRef}
                    className="design-preview-inline size-full rounded-4xl"
                    src={src}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    aria-hidden="true"
                />
            </button>
            <div className="flex items-center justify-between gap-2 px-2">
                <span className="text-xs text-(--muted) font-semibold">{title}</span>
                <button
                    type="button"
                    className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-(--line) focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={toggleSound}
                    aria-label={isMuted ? `Unmute ${title}` : `Mute ${title}`}
                    data-tooltip=""
                >
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
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                        {isMuted ? (
                            <path d="m16.5 14.5 5-5m-5 0 5 5" />
                        ) : (
                            <path d="M16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" />
                        )}
                    </svg>
                </button>
            </div>
            <dialog
                ref={dialogRef}
                className="design-preview-dialog"
                aria-label={title}
                onClose={resumeInlineVideo}
                onClick={(event) => {
                    if (event.target === event.currentTarget) event.currentTarget.close();
                }}
            >
                <video
                    ref={dialogVideoRef}
                    className="design-preview-expanded block rounded-4xl"
                    src={src}
                    preload="none"
                    loop
                    muted={isMuted}
                    playsInline
                />
                <button
                    type="button"
                    className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full bg-(--bg) text-(--fg) outline-offset-2 focus-visible:outline-2"
                    aria-label="Close preview"
                    onClick={() => dialogRef.current.close()}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                </button>
            </dialog>
        </div>
    );
}

export default function InteractiveDesigns() {
    return (
        <section aria-labelledby="interactive-designs-title" className="mt-24 flex flex-col items-center">
            <h2 id="interactive-designs-title" className="text-sm font-bold">Interactive Designs</h2>
            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                <DesignPreview title="Suggestion Ticket from Tally" src={tallyTicket} aspect={1} />
                <DesignPreview title="License Ticket from Tally" src={tallyLicense} aspect={16 / 9} />
            </div>
        </section>
    );
}
