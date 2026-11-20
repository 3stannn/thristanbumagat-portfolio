import kodekzSig from "../assets/kodekzsig.svg";

const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-0">
            {/* progressive blur: strongest at the very top, fading out below the bar */}
            <div className="nav-blur" aria-hidden="true">
                <div />
                <div />
                <div />
                <div />
            </div>
            <div className="relative px-8 py-4 flex flex-row justify-between items-center">
                <a href="#about" className="brand nav-link" aria-label="Kodekz">
                    {/* signature tinted with currentColor via mask so it follows the theme */}
                    <span
                        aria-hidden="true"
                        className="block h-10 aspect-896/512 bg-current"
                        style={{
                            maskImage: `url(${kodekzSig})`,
                            WebkitMaskImage: `url(${kodekzSig})`,
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "left center",
                            WebkitMaskPosition: "left center",
                        }}
                    />
                </a>
                <div className="flex flex-row gap-8">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="nav-link font-bold text-xs">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
export default Navbar
