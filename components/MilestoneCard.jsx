"use client";

import { useState } from "react";
import Image from "next/image";

export default function MilestoneCard({ milestone, index }) {
    const [expanded, setExpanded] = useState(false);
    const isOdd = (index + 1) % 2 === 1;

    return (
        <div
            className={`flex flex-col h-full md:flex-row ${isOdd ? "md:flex-row-reverse bg-teal-dark" : "bg-teal-deep"}`}
        >
            <div className="w-full h-64 md:h-auto md:w-1/2 relative">
                <Image
                    src={milestone.image_url}
                    alt={milestone.image_alt}
                    fill
                    className="object-contain"
                />
                <span className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
                    {milestone.image_credit}
                </span>
            </div>

            <div className="text-wrap w-full md:w-1/2 p-8">
                <div className="text-2xl font-semibold text-text-heading">{milestone.event}</div>

                <p className="text-lg mt-2 text-text-secondary">
                    {milestone.summary}
                </p>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 mt-3 text-cyan-bright hover:text-cyan-electric transition-colors duration-200 cursor-pointer"
                    aria-expanded={expanded}
                >
                    <span className="text-sm font-medium">
                        {expanded ? "Read less" : "Read more"}
                    </span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{
                        gridTemplateRows: expanded ? "1fr" : "0fr",
                    }}
                >
                    <div className="overflow-hidden">
                        <div className="text-lg pt-3">
                            {milestone.detail}
                            <sup className="text-cyan-bright ml-1">
                                [{milestone.source_ids.join(", ")}]
                            </sup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
