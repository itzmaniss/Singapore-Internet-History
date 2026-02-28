"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/overview", label: "Overview" },
    { href: "/foundation", label: "Foundation" },
    { href: "/wireless", label: "Wireless" },
    { href: "/smart-nation", label: "Smart Nation" },
];

export default function NavBar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-navbar-bg/95 shadow-lg shadow-black/30 backdrop-blur-sm"
                    : "bg-navbar-bg"
            }`}
        >
            <nav className="py-3 px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-text-main font-bold text-lg hover:text-cyan-bright transition-colors duration-200"
                >
                    SG Digital Journey
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex gap-4 text-sm">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`hover:text-cyan-bright transition-colors duration-200 ${
                                    isActive ? "text-cyan-bright" : "text-text-secondary"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Hamburger button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-text-secondary hover:text-cyan-bright transition-colors duration-200"
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    menuOpen ? "max-h-60" : "max-h-0"
                }`}
            >
                <div className="flex flex-col gap-2 px-6 pb-4 text-sm">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                aria-current={isActive ? "page" : undefined}
                                className={`py-2 hover:text-cyan-bright transition-colors duration-200 ${
                                    isActive ? "text-cyan-bright" : "text-text-secondary"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
