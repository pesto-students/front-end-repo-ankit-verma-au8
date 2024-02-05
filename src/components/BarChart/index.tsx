import { Bar } from "react-chartjs-2";
import { getRandomColor } from "@/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { styled } from "@mui/material/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  zoomPlugin
);

const ChartContainer = styled("div")(({ theme }) => ({
  height: "30vh",
  maxWidth: "99%",
  [`${theme.breakpoints.up("md")}`]: {
    height: "50vh",
    maxWidth: "100%",
  },
}));

const BarChart = () => {
  const categories = [
    "Utilties",
    "Entertainment",
    "Food",
    // "Hospital",
    // "Education",
  ];
  const DATA_LENGTH = 5;
  const BIN_LENGTH = 5;
  const DATA = Array.from({ length: DATA_LENGTH }, (_, i) => {
    let d = Array.from({ length: BIN_LENGTH }, () => Math.random() * 10001);
    return {
      label: "Dataset " + i,
      data: d,
      clip: 5,
      backgroundColor: getRandomColor(),
    };
  });

  const cat1Data = [6, 64, 673, 35, 54];
  const cat2Data = [45, 235, 978, 2345, 262];
  const cat3Data = [32, 76, 245, 9867, 543];
  const allData = [...cat1Data, ...cat2Data, ...cat3Data];
  const data = {
    labels: categories,
    datasets: DATA,
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 15,
        },
        title: {
          display: true,
          padding: 0,
        },
      },

      // pan: {
      //   enabled: true,
      //   mode: "x",
      //   speed: 5,
      //   threshold: 5,
      // },
      // zoom: {
      //   enabled: true,
      //   mode: "",
      // },

      // zoom: {
      //   pan: {
      //     enabled: true,
      //     mode: "x",
      //     scaleMode: "x",
      //     threshold: 5,
      //   },
      //   limits: {
      //     x: { min: 0, max: 5 },
      //   },
      // },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        max: Math.round(Math.max(...allData) / 1000) * 1000, //Upper limit of y axis
      },
    },
  };

  return (
    <ChartContainer>
      <Bar options={options} data={data} />
    </ChartContainer>
  );
};

export default BarChart;
