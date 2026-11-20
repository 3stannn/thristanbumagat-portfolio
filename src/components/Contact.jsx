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
                        >
                            thristandave12@gmail.com
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">GitHub</span>
                        <a className="no-underline text-sm font-semibold" href="https://github.com/3stannn">
                            @3stannn
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">X</span>
                        <a className="no-underline text-sm font-semibold" href="https://x.com/kodekzz">
                            @kodekzz
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">Linkedin</span>
                        <a className="no-underline text-sm font-semibold" href="https://www.linkedin.com/in/thristandavebumagat/">
                            in/thristandavebumagat
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center mt-4">
                        <span className="text-xs font-bold text-(--muted)">Resume</span>
                        <a
                            className="text-sm font-semibold no-underline flex flex-row items-center gap-1"
                            href={resumeUrl}
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
