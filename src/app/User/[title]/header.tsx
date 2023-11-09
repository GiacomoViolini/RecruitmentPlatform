"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface HeaderProps {
  steps: number;
}

export default function Header({ steps }: HeaderProps) {
  const chartRef = useRef<Chart>();

  useEffect(() => {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const DataArray: number[] = Array(5).fill(0);
    for (let i = 0; i < steps; i++) {
      DataArray[i] = Math.random() * 100;
      if(DataArray[i] < 50) {
        while(DataArray[i] < 50) {
          DataArray[i] = Math.random() * 100;
        }
      }
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
        datasets: [
          {
            label: "Performance",
            data: DataArray,
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
    <div className="container w-6/12 translate-y-20 h-80 px-8 rounded-md py-2">
      <canvas id="myChart"></canvas>
    </div>
  );
}

