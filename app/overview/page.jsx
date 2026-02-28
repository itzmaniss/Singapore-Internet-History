import { Bebas_Neue, Raleway } from "next/font/google";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import SingaporeChart from "@/components/SingaporeChart";
import GlobalChart from "@/components/GlobalChart";
import { getEraData } from "@/data/eras/index";
import sgData from "@/data/internet_usage_in_sg.json";
import globalData from "@/data/internet_usage_by_country.json";
import { validateSingaporeInternetUsage, validateGlobalInternetUsage } from "@/utils";
import FadeIn from "@/components/FadeIn";

export const metadata = {
    title: "Overview",
    description: "Charts and data tracking Singapore's internet growth from 2000 to 2024, compared against global adoption rates.",
    openGraph: {
        title: "The Big Picture — Singapore Internet History",
        description: "Charts and data tracking Singapore's internet growth from 2000 to 2024, compared against global adoption rates.",
    },
};

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

const ERA_CARDS = [
    { slug: "foundation", accent: "border-cyan-bright/40" },
    { slug: "wireless", accent: "border-cyan-electric/40" },
    { slug: "smart-nation", accent: "border-gold-warm/40" },
];

export default async function OverviewPage() {
    const sgValid = validateSingaporeInternetUsage(sgData);
    const globalValid = validateGlobalInternetUsage(globalData);

    if (!sgValid || !globalValid) {
        console.error("Data validation failed");
    }

    const eras = await Promise.all(
        ERA_CARDS.map(async (card) => {
            const data = await getEraData(card.slug);
            return { ...data, ...card };
        })
    );

    return (
        <>
            <NavBar />
            <div className={`${raleway.className} bg-page-bg min-w-full`}>
                {/* Hero */}
                <FadeIn>
                    <div className="max-w-4xl mx-auto px-8 py-16 text-center">
                        <h1
                            className={`${bebas.className} text-4xl md:text-6xl font-bold text-text-heading`}
                        >
                            The Big Picture
                        </h1>
                        <p className="text-text-secondary text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
                            From a single 64 kbps academic link in 1991 to nationwide 5G and
                            plans for 10 Gbps broadband, Singapore&apos;s internet story is one
                            of relentless ambition. The charts below trace that journey through
                            data — and the era cards invite you to explore each chapter in detail.
                        </p>
                    </div>
                </FadeIn>

                {/* Singapore Chart */}
                <FadeIn>
                    <section className="max-w-5xl mx-auto px-8 pb-16">
                        <h2
                            className={`${bebas.className} text-2xl md:text-4xl text-text-heading mb-2`}
                        >
                            Singapore&apos;s Internet Growth
                        </h2>
                        <p className="text-text-secondary text-sm mb-6">
                            Individual internet penetration rate, 2000 – 2024. Source: Data.gov.sg
                        </p>
                        <div className="bg-teal-dark/50 rounded-xl p-4 md:p-6 border border-cyan-muted/10">
                            <SingaporeChart data={sgData.data} />
                        </div>
                    </section>
                </FadeIn>

                {/* Global Chart */}
                <FadeIn>
                    <section className="max-w-5xl mx-auto px-8 pb-16">
                        <h2
                            className={`${bebas.className} text-2xl md:text-4xl text-text-heading mb-2`}
                        >
                            Singapore vs. The World
                        </h2>
                        <p className="text-text-secondary text-sm mb-6">
                            Internet users as a percentage of population, 1990 – 2025. Source: World Bank
                        </p>
                        <div className="bg-teal-dark/50 rounded-xl p-4 md:p-6 border border-cyan-muted/10">
                            <GlobalChart
                                years={globalData.years}
                                countries={globalData.countries}
                            />
                        </div>
                    </section>
                </FadeIn>

                {/* Era Cards */}
                <FadeIn>
                    <section className="max-w-5xl mx-auto px-8 pb-20">
                        <h2
                            className={`${bebas.className} text-2xl md:text-4xl text-text-heading mb-8 text-center`}
                        >
                            Explore the Eras
                        </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {eras.map((era) => (
                            <Link
                                key={era.slug}
                                href={`/${era.slug}`}
                                className={`group bg-teal-dark rounded-xl p-6 border ${era.accent} hover:border-cyan-bright transition-all duration-300 hover:-translate-y-1`}
                            >
                                <h3 className="text-xl font-semibold text-text-main group-hover:text-cyan-bright transition-colors">
                                    {era.title}
                                </h3>
                                <p className="text-cyan-bright text-sm mt-1 font-medium">
                                    {era.period}
                                </p>
                                <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                                    {era.intro.length > 180
                                        ? era.intro.slice(0, 180) + "..."
                                        : era.intro}
                                </p>
                                <span className="inline-block mt-4 text-cyan-bright text-sm font-medium group-hover:translate-x-1 transition-transform">
                                    Explore Era →
                                </span>
                            </Link>
                        ))}
                    </div>
                    </section>
                </FadeIn>
            </div>
        </>
    );
}
