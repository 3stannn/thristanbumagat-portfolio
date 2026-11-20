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
                        <a className="no-underline text-sm font-semibold" href="">
                            @3stannn
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">X</span>
                        <a className="no-underline text-sm font-semibold" href="">
                            @kodekzz
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center">
                        <span className="text-xs font-bold text-(--muted)">Linkedin</span>
                        <a className="no-underline text-sm font-semibold" href="">
                            in/thristandavebumagat
                        </a>
                    </div>
                    <div className="flex flex-row py-2 justify-between items-center mt-4">
                        <span className="text-xs font-bold text-(--muted)">Resume</span>
                        <a
                            className="text-sm font-semibold no-underline flex flex-row items-center gap-1"
                            href=""
                        >
                            Download{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#757576"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-arrow-down-to-line preview-icon"
                            >
                                <path d="M12 17V3" />
                                <path d="m6 11 6 6 6-6" />
                                <path d="M19 21H5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;
