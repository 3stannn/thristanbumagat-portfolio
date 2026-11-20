const tallyWeb = new URL("../../assets/projects/tally/tally-web.png", import.meta.url).href;
const kipWeb = new URL("../../assets/projects/kip/kip-web.png", import.meta.url).href;

// `image`: import a screenshot from src/assets (default import, no braces) or use a URL.
//   The cover keeps its aspect ratio within the available card width and height.
// `background`: a CSS color/gradient, used as the card when there's no image.

const projects = [
    {
        slug: "tally",
        title: "Tally - Developer CRM",
        role: "Full-Stack Developer",
        period: "2026–present",
        tags: ["Developer CRM", "Electron", "React Native"],
        site: "https://usetally-psi.vercel.app/",
        summary: "A local-first Windows CRM for solo developers to manage clients, projects, and follow-ups in one place.",
        contributions: [
            "Built a desktop workspace for organizing contacts, tracking deals, and keeping up with client follow-ups.",
            "Brought project deadlines and payment tracking into the same workspace as client records.",
            "Integrated GitHub monitoring so developers can follow repository activity alongside their client work.",
        ],
        image: [tallyWeb],
        coverSize: { width: 1920, height: 1080 },
        background: "#F6F6F6",
    },
    {
        slug: "kip",
        title: "Kip - Agent Orchestration",
        role: "Full-Stack Developer",
        tags: ["Orchestrator", "Developer Tool"],
        site: "https://usekip.vercel.app/",
        summary: "A coding workflow for Codex, Claude Code, and Antigravity that adapts to the size of the task.",
        contributions: [
            "Built a workflow that handles small changes in the current chat and can bring in workers and an independent reviewer for larger tasks.",
            "Added an installer for supported hosts. Kip runs inside the coding chat using the host's models, tools, and permissions.",
            "Built a command playground to help developers find a workflow and draft a prompt for their task.",
        ],
        image: [kipWeb],
        coverSize: { width: 1920, height: 1080 },
        background: "#F6F6F6",
    },
];

export function projectPath(slug) {
    return `/projects/${slug}/`;
}

export default projects;
