"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker"; //fake data

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false,
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [200, 300, 400, 150, 50, 123, 334],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: "Dataset 2",
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export function App() {
  return <Bar options={options} data={data} />;
}

export default function BarChart() {
  return (
    // <div className="">
    <Bar data={data} options={options} />
    // </div>
  );
}
