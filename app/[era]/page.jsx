import Image from "next/image";
import { notFound } from "next/navigation";
import { getEraData } from "@/data/eras/index";
import NavBar from "@/components/NavBar";

export default async function EraPage({ params }) {
    const { era } = await params;
    if (!["foundation", "wireless", "smart-nation"].includes(era)) {
        return notFound();
    }
    const eraData = await getEraData(era);
    return (
        <>
            <NavBar/>
            <div className="bg-page-bg flex flex-col justify-start  min-w-full">
                <div className="max-w-4xl mx-auto px-8 py-12">
                    <h1 className="text-2xl md:text-4xl font-bold text-center text-text-main">
                        {eraData.title} ({eraData.period})
                    </h1>
                    <p className="text-text-secondary text-lg mt-4 text-center leading-relaxed">
                        {eraData.intro}
                    </p>
                </div>
                <div className="grid grid-cols-1 mt-12 auto-rows-[minmax(200px,auto)] md:auto-rows-[minmax(300px,auto)]">
                {eraData.milestones.map((section, index) => {
                    const isOdd = (index + 1) % 2 === 1;
                    return (
                <div key={index}>
                            <div className={`flex flex-col h-full md:flex-row ${isOdd ? 'md:flex-row-reverse bg-teal-dark' : 'bg-teal-deep'}`}>
                                <div className="w-full md:w-1/2 relative">
                                    <Image src={section.image_url} alt={section.image_alt} fill className="object-cover" />
                                    <span className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
                                        {section.image_credit}
                                    </span>
                                </div>

                                <div className="text-wrap w-full md:w-1/2 p-8">
                                    <div className="text-2xl font-semibold">
                                        {section.event}
                                    </div>
                                    <div className="text-lg">
                                        {section.detail}
                                        <sup className="text-cyan-bright ml-1">
                                            [{section.source_ids.join(", ")}]
                                        </sup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
                <div className="max-w-4xl mx-auto px-8 py-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-6">Sources</h2>
                    <ol className="list-none space-y-3 text-text-secondary">
                        {eraData.sources.map((source) => (
                            <li key={source.id} id={`source-${source.id}`} className="text-sm md:text-base leading-relaxed">
                                <sup className="text-cyan-bright font-bold mr-1">[{source.id}]</sup>
                                {source.citation}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    )
} 