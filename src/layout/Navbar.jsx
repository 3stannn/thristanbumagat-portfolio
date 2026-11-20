import { useEffect, useRef, useState } from "react";
import kodekzSig from "../assets/kodekzsig.svg";
import kodekzSigWhite from "../assets/kodekzsigwhite.svg";
import NavbarBlur from "./NavbarBlur";

const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButton = useRef(null);

    useEffect(() => {
        if (!isMenuOpen) return;

        const desktop = window.matchMedia("(min-width: 40rem)");
        const closeOnDesktop = (event) => {
            if (event.matches) setIsMenuOpen(false);
        };

        desktop.addEventListener("change", closeOnDesktop);
        return () => desktop.removeEventListener("change", closeOnDesktop);
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const dismissMenu = () => {
        closeMenu();
        menuButton.current.focus();
    };

    return (
        <nav
            className="home-navbar fixed inset-x-0 top-0"
            data-menu-open={isMenuOpen}
            aria-label="Main navigation"
            onKeyDown={(event) => {
                if (isMenuOpen && event.key === "Escape") {
                    event.preventDefault();
                    dismissMenu();
                }
            }}
            onBlur={(event) => {
                if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
            }}
        >
            <NavbarBlur />
            <div className="home-nav-backdrop" aria-hidden="true" onClick={dismissMenu} />
            <div className="home-nav-panel relative px-8 py-4 flex flex-row justify-between items-center">
                <a href="#about" className="brand nav-link" aria-label="Kodekz" onClick={closeMenu}>
                    {/* dark signature in light mode, white signature in dark mode */}
                    <span className="sig">
                        <img src={kodekzSig} alt="" aria-hidden="true" className="sig-light block h-10 aspect-896/512" />
                        <img src={kodekzSigWhite} alt="" aria-hidden="true" className="sig-dark block h-10 aspect-896/512" />
                    </span>
                </a>
                <button
                    ref={menuButton}
                    type="button"
                    className="home-nav-toggle"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="home-nav-links"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    {isMenuOpen ? "Close" : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4 5h16" />
                            <path d="M4 12h16" />
                            <path d="M4 19h16" />
                        </svg>
                    )}
                </button>
                <div id="home-nav-links" className="home-nav-links flex flex-row gap-8">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="nav-link font-bold text-xs" onClick={closeMenu}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
export default Navbar
