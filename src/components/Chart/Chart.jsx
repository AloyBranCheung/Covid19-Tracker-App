import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { fetchDayOne } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Chart({ selectedCountry, toggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDayOne(selectedCountry);
      setData(data);
    };
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [selectedCountry]);

  if (isLoading) {
    return <CircularProgress />;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // LINE CHART

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: selectedCountry,
      },
    },
  };

  const lineChartLabels = data.map((snapshot) => {
    const date = new Date(snapshot.Date);
    return date.toDateString();
  });

  const lineChartConfirmed = data.map((snapshot) => {
    const confirmedCount = snapshot.Confirmed;
    return confirmedCount;
  });

  const lineChartRecovered = data.map((snapshot) => {
    const recoveredCount = snapshot.Recovered;
    return recoveredCount;
  });

  const lineChartActive = data.map((snapshot) => {
    const activeCount = snapshot.Active;
    return activeCount;
  });

  const lineChartDeaths = data.map((snapshot) => {
    const deathCount = snapshot.Deaths;
    return deathCount;
  });

  const lineChartData = {
    labels: lineChartLabels,
    datasets: [
      {
        label: "Confirmed",
        data: lineChartConfirmed,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Recovered",
        data: lineChartRecovered,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Active",
        data: lineChartActive,
        borderColor: "#3333ff",
        fill: true,
      },
      {
        label: "Deaths",
        data: lineChartDeaths,
        borderColor: "rgba(255, 0, 0, 0.5)",
        fill: true,
      },
    ],
  };

  const lineChart =
    data.length !== 0 || data === undefined ? (
      <>
        <Line options={options} data={lineChartData} />
      </>
    ) : (
      <div>No Data</div>
    );

  // BAR CHART
  let todaysData = data[data.length - 1];
  let confirmed;
  let recovered;
  let deaths;
  let active;
  if (todaysData !== undefined) {
    confirmed = todaysData.Confirmed;
    recovered = todaysData.Recovered;
    deaths = todaysData.Deaths;
    active = todaysData.Active;
  } else {
    confirmed = null;
    recovered = null;
    deaths = null;
    active = null;
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        title: {
          display: true,
          text: `Total as of for ${selectedCountry}`,
        },
      },
    },
  };

  const barLabels = ["Confirmed", "Recovered", "Deaths", "Active"];

  const barDataset = [
    {
      label: "People",
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(53, 162, 235, 0.5)",
        "rgba(255, 0, 0, 0.5)",
      ],
      data: [confirmed, recovered, deaths, active],
    },
  ];

  const barData = {
    labels: barLabels,
    datasets: barDataset,
  };

  const barChar =
    todaysData !== 0 || todaysData === undefined ? (
      <>
        <Bar data={barData} options={barOptions} />
      </>
    ) : (
      <div>No Data</div>
    );

  return <div className={styles.container}>{toggle ? barChar : lineChart}</div>;
}
