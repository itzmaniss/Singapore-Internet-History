import Link from "next/link";
import NavBar from "@/components/NavBar";
import FadeIn from "@/components/FadeIn";

export default function NotFound() {
    return (
        <>
            <NavBar />
            <div className="bg-page-bg h-screen flex items-center justify-center">
                <FadeIn>
                    <div className="text-center flex flex-col gap-4">
                        <span className="text-5xl text-text-heading font-bold">404</span>
                        <p className="text-text-secondary text-lg">Page not found.</p>
                        <Link href="/overview">
                            <button className="bg-cyan-bright text-white px-6 py-2 rounded-full hover:bg-white hover:text-cyan-950 hover:scale-105 transition-all duration-300">
                                Back to Overview
                            </button>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </>
    );
}
