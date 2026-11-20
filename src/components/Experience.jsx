const experiences = [
    { org: "Independent", project: "Tally", role: "Software Developer", period: "2026 - now" },
    { org: "AWSLC - Genesis", role: "Tech Officer", period: "2026 - now" },
    { org: "Freelance", role: "Web Developer", period: "2024 - now" },
]

function Experience() {
    return(
        <div className="mt-24">
            <div className="max-w-2xl mx-auto px-8">
                <span className="font-bold text-sm">Experience</span>
                <div className="mt-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp.org}
                            className="grid grid-cols-[1fr_2fr_auto] items-center gap-4 px-2 py-2"
                        >
                            <span className="text-xs font-bold text-(--muted)">{exp.org}</span>
                            <div className="flex flex-col">
                                {exp.project && <span className="text-sm font-bold">{exp.project}</span>}
                                <span className="text-xs font-medium text-(--muted)">{exp.role}</span>
                            </div>
                            <span className="text-xs font-bold text-(--muted) text-right">{exp.period}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Experience
