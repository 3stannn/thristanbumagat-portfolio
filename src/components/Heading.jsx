import devPfp from "../assets/pfp.jpg";
import ThemeToggle from "./ThemeToggle";

function Heading() {
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
                            href=""
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
                                target="_blank"
                                rel="noopener"
                            >
                                github
                            </a>
                            <a
                                className="text-xs font-semibold"
                                href="https://x.com/kodekzz"
                                target="_blank"
                                rel="noopener"
                            >
                                x
                            </a>
                            <a
                                className="text-xs font-semibold"
                                href="https://www.linkedin.com/in/thristandavebumagat/"
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
            </div>
        </div>
    );
}
export default Heading;
