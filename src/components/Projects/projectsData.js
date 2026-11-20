import tallyWeb from "../../assets/projects/tally/tally-web.png";
import kipWeb from "../../assets/projects/kip/kip-web.png";
import kipWeb2 from "../../assets/projects/kip/kip-web2.png";
import kipWeb3 from "../../assets/projects/kip/kip-web3.png";

// `image`: import a screenshot from src/assets (default import, no braces) or use a URL.
//   All cards share one height; each card's width follows its image's shape,
//   so desktop screenshots come out wide and phone screenshots narrow.
// `background`: a CSS color/gradient, used as the card when there's no image.

const projects = [
    {
        title: "Tally",
        tags: ["Developer CRM", "Electron", "React Native"],
        link: "https://github.com/3stannn",
        image: tallyWeb,
        background: "#F6F6F6",
    },
    {
        title: "Kip - Agent Orchestration",
        tags: ["Orchestrator", "Developer Tool"],
        link: "https://github.com/3stannn",
        image: [kipWeb, kipWeb2, kipWeb3],
        background: "#F6F6F6",
    },
];

export default projects;
