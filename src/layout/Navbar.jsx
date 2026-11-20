import kodekzSig from "../assets/kodekzsig.svg";
import kodekzSigWhite from "../assets/kodekzsigwhite.svg";
import NavbarBlur from "./NavbarBlur";

const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-0">
            <NavbarBlur />
            <div className="relative px-8 py-4 flex flex-row justify-between items-center">
                <a href="#about" className="brand nav-link" aria-label="Kodekz">
                    {/* dark signature in light mode, white signature in dark mode */}
                    <span className="sig">
                        <img src={kodekzSig} alt="" aria-hidden="true" className="sig-light block h-10 aspect-896/512" />
                        <img src={kodekzSigWhite} alt="" aria-hidden="true" className="sig-dark block h-10 aspect-896/512" />
                    </span>
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
