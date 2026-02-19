import "./globals.css";
import Footer from "@/components/Footer"

export const metadata = {
    title: "Singapore Internet History",
    description: "The history of the internet in Singapore, from its humble beginnings to its current state as a global technology hub.",
    authors: [
        {
            name: "itzmaniss",
        }
    ],
    robots: {
        index: true,
        follow: true,
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
            </body>
        </html>
    );

}