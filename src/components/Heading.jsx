import { useRef, useState } from "react";
import devPfp from "../assets/pfp.jpg";
import ThemeToggle from "./ThemeToggle";
import tallyTicket from "../assets/projects/tally/tallysuggestion.mp4";
import tallyLicense from "../assets/projects/tally/tally-license-ticket.mp4";

function Heading() {
    const ticketVideoRef = useRef(null);
    const [isTicketMuted, setIsTicketMuted] = useState(true);
    const soundAction = isTicketMuted ? "Unmute Tally preview" : "Mute Tally preview";

    function toggleTicketSound() {
        const video = ticketVideoRef.current;
        video.muted = !video.muted;

        if (!video.muted && video.paused) {
            video.play().catch(() => {
                // Playback can still fail if the video is unavailable.
            });
        }
    }

    return (
        <div id="about" className="mt-24">
            <div className="max-w-2xl mx-auto px-8">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-4">
                        <img
                            className="w-20 rounded-2xl"
                            src={devPfp}
                            alt="Developer Profile"
                            srcset=""
                        />
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-1 items-center">
                                <span className="font-bold text-sm leading-4">
                                    Thristan Dave Bumagat
                                </span>
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="#3b82f6">
                                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.416-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                </svg>
                            </div>
                            <span className="font-medium text-xs text-(--muted) leading-4">
                                Web & Software Developer
                            </span>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
                <div className="mt-12">
                    <span className="font-bold text-2xl">Hello!</span>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <span className="font-semibold text-sm">
                        I'm Thristan, a Freelance Developer. 3rd year Computer Science
                        student, aspiring software engineer. Building clean full-stack
                        platforms, bridging frontier AI models with agentic tooling, and
                        architecting normalized relational backends. <br />
                    </span>
                    <span className="font-semibold text-sm">
                        I built Tally, a local-only Windows CRM for solo devs. Track
                        clients, projects, deadlines, and payments alongside GitHub
                        monitoring in one app.
                    </span>
                </div>
                <div className="mt-8">
                    <div className="flex flex-row items-center justify-between">
                        <a
                            className="button text-sm inline-flex items-center gap-2 font-semibold"
                            href="#contact"
                            data-tooltip="Get in touch"
                        >
                            Let's work together
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-arrow-right preview-icon"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </a>
                        <div className="flex flex-row gap-8">
                            <a
                                className="text-xs font-semibold"
                                href="https://github.com/3stannn"
                                data-tooltip="Open GitHub profile"
                                target="_blank"
                                rel="noopener"
                            >
                                github
                            </a>
                            <a
                                className="text-xs font-semibold"
                                href="https://x.com/kodekzz"
                                data-tooltip="Open X profile"
                                target="_blank"
                                rel="noopener"
                            >
                                x
                            </a>
                            <a
                                className="text-xs font-semibold"
                                href="https://www.linkedin.com/in/thristandavebumagat/"
                                data-tooltip="Open LinkedIn profile"
                                target="_blank"
                                rel="noopener"
                            >
                                linkedin
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-xs font-semibold text-(--muted) flex flex-row items-center gap-2">
                        <svg
                            width={8}
                            height={8}
                            viewBox="0 0 24 24"
                            aria-label="Available"
                        >
                            <circle cx="12" cy="12" r="10" fill="#22c55e" />
                        </svg>
                        Open to Freelance Work and Internship
                    </span>
                </div>
                <div className="mt-24">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-sm font-bold">Interactive Designs</span>
                        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                            <div className="max-w-full">
                                <video
                                    ref={ticketVideoRef}
                                    className="mt-4 mb-4 w-80 rounded-4xl"
                                    src={tallyTicket}
                                    autoPlay
                                    loop
                                    muted={isTicketMuted}
                                    playsInline
                                    onVolumeChange={(event) => setIsTicketMuted(event.currentTarget.muted)}
                                />
                                <div className="flex items-center justify-between gap-2 px-2">
                                    <span className="text-xs text-(--muted) font-semibold">
                                        Suggestion Ticket from Tally
                                    </span>
                                    <button
                                        type="button"
                                        className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-(--line) focus-visible:outline-2 focus-visible:outline-offset-2"
                                        onClick={toggleTicketSound}
                                        aria-label={soundAction}
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
                                            {isTicketMuted ? (
                                                <path d="m16.5 14.5 5-5m-5 0 5 5" />
                                            ) : (
                                                <path d="M16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="max-w-full">
                                <video
                                    ref={ticketVideoRef}
                                    className="mt-4 mb-4 w-80 rounded-4xl"
                                    src={tallyLicense}
                                    autoPlay
                                    loop
                                    muted={isTicketMuted}
                                    playsInline
                                    onVolumeChange={(event) => setIsTicketMuted(event.currentTarget.muted)}
                                />
                                <div className="flex items-center justify-between gap-2 px-2">
                                    <span className="text-xs text-(--muted) font-semibold">
                                        License Ticket from Tally
                                    </span>
                                    <button
                                        type="button"
                                        className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-(--line) focus-visible:outline-2 focus-visible:outline-offset-2"
                                        onClick={toggleTicketSound}
                                        aria-label={soundAction}
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
                                            {isTicketMuted ? (
                                                <path d="m16.5 14.5 5-5m-5 0 5 5" />
                                            ) : (
                                                <path d="M16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Heading;
