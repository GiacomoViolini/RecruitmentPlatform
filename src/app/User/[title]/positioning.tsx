"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface HeaderProps {
    steps: number;
    points: number[];
}

export default function Positioning({ steps, points }: HeaderProps) {
    const chartRef = useRef<Chart>();
    const [Positioning, setPositioning] = useState<number[]>([]);
    console.log(points);
    console.log(steps);

    useEffect(() => {
        const newPositioning: number[] = Array(steps).fill(0);
        async function FindPositionRange(newPositioning: number[]) {
            for (let i = 0; i < steps; i++) {
                if (points[i] <= 50 && points[i] >= 65) {
                    newPositioning[i] = 30;
                } else if (points[i] <= 65 && points[i] >= 80) {
                    newPositioning[i] = 60;
                } else if (points[i] <= 80 && points[i] >= 90) {
                    newPositioning[i] = 80;
                } else if (points[i] <= 90 && points[i] >= 100) {
                    newPositioning[i] = 100;
                } else {
                    newPositioning[i] = 0;
                }
            }
            setPositioning(newPositioning);
        }
        FindPositionRange(newPositioning);
    }, [points, steps]);

    useEffect(() => {
        const canvas = document.getElementById("PositioningChart") as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [
                    "Technical Assesment",
                    "Technical Interview",
                    "Behavioral Interview",
                    "Team Work Session Simulation",
                ],
                datasets: [
                    {
                        indexAxis: "y",
                        label: "Percentage of candidates beated",
                        data: Positioning,
                        backgroundColor: [
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                        ],
                        borderColor: [
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                    },
                },
                maintainAspectRatio: false,
            },
        });
    }, [steps]);

    return (
        <div className="flex flex-col w-full pt-8">
            <div className="text-2xl font-bold text-center md:text-start pt-2 px-8 -translate-y-10 text-blue-500">
                Your positioning relative to the other candidates
            </div>
            <div className="container w-full md:w-6/12 md:h-80 pt-12 md:pt-4 lg:pt-0 md:px-8 pr-8 rounded-md py-2">
                <canvas id="PositioningChart"></canvas>
            </div>
        </div>
    );
}
