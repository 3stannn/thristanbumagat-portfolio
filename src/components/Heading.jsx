import devPfp from "../assets/pfp.jpg";

function Heading() {
    return (
        <div className="mt-24">
            <div className="max-w-2xl mx-auto px-8">
                <div className="flex flex-row items-center gap-4">
                    <img
                        className="w-20 rounded-xl"
                        src={devPfp}
                        alt="Developer Profile"
                        srcset=""
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-[#757576] leading-4">
                            Web & Software <br /> Developer
                        </span>
                    </div>
                </div>
                <div className="mt-12">
                    <span className="font-bold text-2xl">Hello!</span>
                </div>
                <div className="mt-4">
                    <span className="font-bold text-sm">
                        I'm Thristan, a Freelance Developer. 3rd year Computer Science
                        student, aspiring software engineer. Building clean full-stack
                        platforms, bridging frontier AI models with agentic tooling, and
                        architecting normalized relational backends.
                    </span>
                </div>
                <div className="mt-8">
                    <div className="flex flex-row items-center justify-between">
                        <a className="button text-xs inline-flex items-center gap-2 font-bold" href="">
                            Let's work together
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#E9E7E2"
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
                        <div className="flex flex-row gap-4">
                            <a className="text-xs font-bold" href="">github</a>
                            <a className="text-xs font-bold" href="">x</a>
                            <a className="text-xs font-bold" href="">linkedin</a>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-xs font-bold text-[#757576] flex flex-row items-center gap-2">
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
