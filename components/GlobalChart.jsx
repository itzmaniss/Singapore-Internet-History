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
    annotationPlugin
);

const ERA_BANDS = {
    foundation: {
        type: "box",
        xMin: "1991",
        xMax: "2004",
        backgroundColor: "rgba(0, 188, 212, 0.06)",
        borderColor: "rgba(0, 188, 212, 0.2)",
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
        backgroundColor: "rgba(29, 211, 237, 0.06)",
        borderColor: "rgba(29, 211, 237, 0.2)",
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
        xMax: "2025",
        backgroundColor: "rgba(255, 183, 77, 0.06)",
        borderColor: "rgba(255, 183, 77, 0.2)",
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

export default function GlobalChart({ years, countries }) {
    const sorted = [...countries].sort((a, b) => {
        const lastA = a.data[a.data.length - 1] ?? 0;
        const lastB = b.data[b.data.length - 1] ?? 0;
        return lastB - lastA;
    });

    const chartData = {
        labels: years.map(String),
        datasets: sorted.map((country) => ({
            label: country.name,
            data: country.data,
            borderColor: country.color,
            backgroundColor: country.color,
            borderWidth: country.highlight ? 3.5 : 1.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: country.color,
            tension: 0.3,
            order: country.highlight ? 0 : 1,
        })),
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
                position: "bottom",
                labels: {
                    color: "#e0f2f7",
                    font: { family: "Raleway, sans-serif", size: 11 },
                    usePointStyle: true,
                    pointStyle: "line",
                    boxWidth: 20,
                    padding: 12,
                    generateLabels: (chart) =>
                        chart.data.datasets.map((ds, i) => {
                            const isSg = ds.borderWidth > 2;
                            return {
                                text: ds.label,
                                fillStyle: ds.borderColor,
                                strokeStyle: ds.borderColor,
                                lineWidth: isSg ? 3.5 : 1.5,
                                hidden: !chart.isDatasetVisible(i),
                                datasetIndex: i,
                                fontColor: isSg ? "#ffffff" : "#e0f2f7",
                                font: {
                                    weight: isSg ? "bold" : "normal",
                                    family: "Raleway, sans-serif",
                                    size: 11,
                                },
                            };
                        }),
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
                itemSort: (a, b) => b.parsed.y - a.parsed.y,
                callbacks: {
                    label: (ctx) =>
                        `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%`,
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
            <div className="relative h-87.5 md:h-125 min-w-120">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
