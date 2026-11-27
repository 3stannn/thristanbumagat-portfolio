const dynamicIsleWeb = new URL("../../assets/projects/dynamic-isle/dynamic-isle-web.png", import.meta.url,).href;
const dynamicIsle2 = new URL("../../assets/projects/dynamic-isle/dynamic-isle2.png", import.meta.url,).href;
const tallyWeb = new URL("../../assets/projects/tally/tally-web.png", import.meta.url,).href;
const tallyWeb2 = new URL("../../assets/projects/tally/tally2.png", import.meta.url,).href;
const tallyWeb3 = new URL("../../assets/projects/tally/tally3.png", import.meta.url,).href;
const kipWeb = new URL("../../assets/projects/kip/kip-web.png", import.meta.url).href;

// `image`: import a screenshot from src/assets (default import, no braces) or use a URL.
//   The cover keeps its aspect ratio within the available card width and height.
// `background`: a CSS color/gradient, used as the card when there's no image.

const projects = [
    {
        slug: "dynamic-isle",
        title: "Dynamic Isle",
        role: "Solo Developer & Designer",
        period: "November 2026",
        tags: ["Dynamic Island", "Desktop Widget"],
        site: "https://trydynamicisle.vercel.app/",
        summary:
            "A Dynamic Island–style pill for Windows that puts media controls, notifications, clipboard history and a volume mixer at the top of the screen.",
        contributions: [
            "Built the app solo in C# and WPF on .NET, using Win32 APIs for an always-on-top overlay, a tray icon and a clipboard listener.",
            "Designed the UI, animations, app icon and Store art, with panels for media, notifications, clipboard, sound and timers.",
            "Shipped it to the Microsoft Store as an x64/Arm64 package, with license activation through Polar and a marketing site on Vercel.",
        ],
        image: [dynamicIsleWeb, dynamicIsle2],
        coverSize: { width: 1920, height: 1080 },
        background: "#F6F6F6",
    },
    {
        slug: "tally",
        title: "Tally",
        role: "Full-Stack Engineer",
        period: "November 2026",
        tags: ["CRM", "Electron", "React Native", "SQLite", "Desktop App"],
        site: "https://usetally-psi.vercel.app/",
        summary:
            "A local-first Windows CRM for solo developers to manage clients, projects, and follow-ups in one place.",
        contributions: [
            "Designed and built a local-only Windows CRM from scratch with Electron, React and TypeScript.",
            "Modeled the data in SQLite with Drizzle ORM, with versioned migrations applied at startup.",
            "Integrated the GitHub API to track repositories, commits and pull requests, and stored tokens securely.",
            "Tally is a desktop CRM for freelance developers. It keeps leads, clients, projects, payments and deadlines in one place, alongside your GitHub repositories, commits and pull requests. All data is stored on your own machine in SQLite, so it works offline and needs no account. I designed and built the whole app myself with Electron, React and TypeScript. That includes the kanban board, the lead pipeline, reminders, licensing, auto-updates and the Windows installer.",
        ],
        image: [tallyWeb, tallyWeb2, tallyWeb3],
        coverSize: { width: 1920, height: 1080 },
        background: "#F6F6F6",
    },
    // {
    //     slug: "kip",
    //     title: "Kip - Agent Orchestration",
    //     role: "Developer",
    //     tags: ["Orchestrator", "Developer Tool"],
    //     site: "https://usekip.vercel.app/",
    //     summary:
    //         "A coding workflow for Codex, Claude Code, and Antigravity that adapts to the size of the task.",
    //     contributions: [
    //         "Built a workflow that handles small changes in the current chat and can bring in workers and an independent reviewer for larger tasks.",
    //         "Added an installer for supported hosts. Kip runs inside the coding chat using the host's models, tools, and permissions.",
    //         "Built a command playground to help developers find a workflow and draft a prompt for their task.",
    //     ],
    //     image: [kipWeb],
    //     coverSize: { width: 1920, height: 1080 },
    //     background: "#F6F6F6",
    // },
];

export function projectPath(slug) {
    return `/projects/${slug}/`;
}

export default projects;
