import resumeUrl from "../assets/docs/resume.pdf?url";
import ProjectArrow from "./Projects/ProjectArrow";

function Contact() {
    return (
        <div id="contact" className="mt-12 mb-12">
            <div className="max-w-2xl mx-auto px-8">
                <span className="font-bold text-sm">Contact</span>
                <div className="border-[#757576] px-2 py-2 mt-4">
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">Email</span>
                        <a
                            className="no-underline text-sm font-semibold"
                            href="mailto:thristandave12@gmail.com"
                            data-tooltip="Send an email"
                        >
                            thristandave12@gmail.com
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">GitHub</span>
                        <a
                            className="no-underline text-sm font-semibold"
                            href="https://github.com/3stannn"
                            data-tooltip="Open GitHub profile"
                            target="_blank"
                            rel="noopener"
                        >
                            @3stannn
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">X</span>
                        <a
                            className="no-underline text-sm font-semibold"
                            href="https://x.com/kodekzz"
                            data-tooltip="Open X profile"
                            target="_blank"
                            rel="noopener"
                        >
                            @kodekzz
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">Linkedin</span>
                        <a
                            className="no-underline text-sm font-semibold"
                            href="https://www.linkedin.com/in/thristandavebumagat/"
                            data-tooltip="Open LinkedIn profile"
                            target="_blank"
                            rel="noopener"
                        >
                            in/thristandavebumagat
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center mt-4">
                        <span className="text-xs font-bold text-(--muted)">Resume</span>
                        <a
                            className="text-sm font-semibold no-underline flex flex-row items-center gap-1"
                            href={resumeUrl}
                            data-tooltip="View resume (PDF)"
                            target="_blank"
                            rel="noopener"
                            aria-label="View resume (opens in a new tab)"
                        >
                            View <ProjectArrow direction="external" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;
