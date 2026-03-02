import "./globals.css";
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"

export const metadata = {
    title: {
        default: "Singapore Internet History",
        template: "%s | Singapore Internet History",
    },
    description: "The history of the internet in Singapore, from its humble beginnings to its current state as a global technology hub.",
    authors: [{ name: "itzmaniss" }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_SG",
        siteName: "Singapore Internet History",
    },
}

export default function RootLayout({ children }){
    return (
        <html lang="en">
            <body className="bg-page-bg min-h-screen flex flex-col">
                <main className="grow">
                    {children}
                </main>
                <Footer />
                <BackToTop />
            </body>
        </html>
    );

}