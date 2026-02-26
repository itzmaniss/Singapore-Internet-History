import Link from "next/link";

const NAV_LINKS = [
    { href: "/overview", label: "Overview" },
    { href: "/foundation", label: "Foundation" },
    { href: "/wireless", label: "Wireless" },
    { href: "/smart-nation", label: "Smart Nation" },
];

export default function NavBar() {
    return (
        <nav className="bg-navbar-bg py-3 px-6 flex items-center justify-between">
            <Link
                href="/"
                className="text-text-main font-bold text-lg hover:text-cyan-bright transition-colors duration-200"
            >
                SG Digital Journey
            </Link>
            <div className="flex gap-4 text-text-secondary text-sm">
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="hover:text-cyan-bright transition-colors duration-200"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
