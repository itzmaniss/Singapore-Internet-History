import { notFound } from "next/navigation";
import { getEraData } from "@/data/eras/index";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import MilestoneCard from "@/components/MilestoneCard";
import FadeIn from "@/components/FadeIn";

const ERA_ORDER = ["foundation", "wireless", "smart-nation"];

export async function generateMetadata({ params }) {
    const { era } = await params;
    if (!ERA_ORDER.includes(era)) return {};
    const eraData = await getEraData(era);
    return {
        title: eraData.title,
        description: `${eraData.intro.slice(0, 160)}`,
        openGraph: {
            title: `${eraData.title} (${eraData.period})`,
            description: `${eraData.intro.slice(0, 160)}`,
        },
    };
}

export default async function EraPage({ params }) {
    const { era } = await params;
    if (!ERA_ORDER.includes(era)) {
        return notFound();
    }
    const eraData = await getEraData(era);
    const nextIndex = ERA_ORDER.indexOf(era) + 1;
    const nextEra = nextIndex < ERA_ORDER.length ? ERA_ORDER[nextIndex] : null;
    const nextEraData = nextEra ? await getEraData(nextEra) : null;
    return (
        <>
            <NavBar/>
            <div className="bg-page-bg flex flex-col justify-start  min-w-full">
                <FadeIn>
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-text-heading">
                            {eraData.title} ({eraData.period})
                        </h1>
                        <p className="text-text-secondary text-lg mt-4 text-center leading-relaxed">
                            {eraData.intro}
                        </p>
                    </div>
                </FadeIn>
                <div className="grid grid-cols-1 mt-12 auto-rows-[minmax(200px,auto)] md:auto-rows-[minmax(300px,auto)]">
                {eraData.milestones.map((milestone, index) => (
                    <FadeIn key={index} className="h-full">
                        <MilestoneCard milestone={milestone} index={index} />
                    </FadeIn>
                ))}
                </div>
                <FadeIn>
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-6">Sources</h2>
                        <ol className="list-none space-y-3 text-text-secondary">
                            {eraData.sources.map((source) => (
                                <li key={source.id} id={`source-${source.id}`} className="text-sm md:text-base leading-relaxed">
                                    <sup className="text-cyan-bright font-bold mr-1">[{source.id}]</sup>
                                    {source.citation}
                                </li>
                            ))}
                        </ol>
                    </div>
                </FadeIn>
                <FadeIn>
                    <div className="flex justify-center py-16">
                        <Link href={nextEra ? `/${nextEra}` : "/overview"} className="inline-block bg-white text-black text-base rounded-full px-8 py-3 font-semibold hover:bg-cyan-bright hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                {nextEra ? `Move on to ${nextEraData.title}` : "Back to Overview"}
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </>
    )
} 