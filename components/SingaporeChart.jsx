"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    annotationPlugin
);

const ERA_BANDS = {
    foundation: {
        type: "box",
        xMin: "2000",
        xMax: "2004",
        backgroundColor: "rgba(0, 188, 212, 0.07)",
        borderColor: "rgba(0, 188, 212, 0.25)",
        borderWidth: 1,
        label: {
            display: true,
            content: "Foundation",
            position: { x: "center", y: "start" },
            color: "#80deea",
            font: { size: 9, family: "Raleway, sans-serif" },
            padding: 4,
        },
    },
    wireless: {
        type: "box",
        xMin: "2004",
        xMax: "2013",
        backgroundColor: "rgba(29, 211, 237, 0.07)",
        borderColor: "rgba(29, 211, 237, 0.25)",
        borderWidth: 1,
        label: {
            display: true,
            content: "Wireless",
            position: { x: "center", y: "start" },
            color: "#80deea",
            font: { size: 9, family: "Raleway, sans-serif" },
            padding: 4,
        },
    },
    smartNation: {
        type: "box",
        xMin: "2013",
        xMax: "2024",
        backgroundColor: "rgba(255, 183, 77, 0.07)",
        borderColor: "rgba(255, 183, 77, 0.25)",
        borderWidth: 1,
        label: {
            display: true,
            content: "Smart Nation",
            position: { x: "center", y: "start" },
            color: "#80deea",
            font: { size: 9, family: "Raleway, sans-serif" },
            padding: 4,
        },
    },
};

export default function SingaporeChart({ data }) {
    const chartData = {
        labels: data.map((d) => String(d.year)),
        datasets: [
            {
                label: "Internet Penetration (%)",
                data: data.map((d) => d.percentage),
                borderColor: "#DC143C",
                backgroundColor: "rgba(220, 20, 60, 0.1)",
                borderWidth: 2.5,
                pointRadius: 2,
                pointHoverRadius: 6,
                pointBackgroundColor: "#DC143C",
                pointBorderColor: "#DC143C",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                labels: {
                    color: "#e0f2f7",
                    font: { family: "Raleway, sans-serif", size: 13 },
                },
            },
            tooltip: {
                backgroundColor: "rgba(10, 20, 25, 0.95)",
                titleColor: "#e0f2f7",
                bodyColor: "#80deea",
                borderColor: "rgba(0, 188, 212, 0.3)",
                borderWidth: 1,
                padding: 12,
                titleFont: { family: "Raleway, sans-serif" },
                bodyFont: { family: "Raleway, sans-serif" },
                callbacks: {
                    label: (ctx) => `${ctx.parsed.y.toFixed(1)}%`,
                },
            },
            annotation: {
                annotations: ERA_BANDS,
            },
        },
        scales: {
            x: {
                grid: { color: "rgba(224, 242, 247, 0.08)" },
                ticks: {
                    color: "#80deea",
                    font: { family: "Raleway, sans-serif", size: 11 },
                    maxTicksLimit: 8,
                    maxRotation: 0,
                },
            },
            y: {
                min: 0,
                max: 100,
                grid: { color: "rgba(224, 242, 247, 0.08)" },
                ticks: {
                    color: "#80deea",
                    font: { family: "Raleway, sans-serif", size: 11 },
                    callback: (val) => val + "%",
                },
            },
        },
    };

    return (
        <div className="overflow-x-auto">
            <div className="relative h-75 md:h-112.5 min-w-120">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
