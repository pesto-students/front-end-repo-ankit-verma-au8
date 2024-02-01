import { Pie } from "react-chartjs-2";
import { getRandomColor } from "@/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabel from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabel);

type ChartProps = {
  categories: Array<string>;
  chartData: Array<number>;
  maxHeight: number | string;
  width: number | string;
};

const PieChart = ({
  categories,
  chartData,
  maxHeight = "100%",
  width = "90%",
}: ChartProps) => {
  // const categories = ["Utilties", "Entertainment", "Food", "Medical Bills"];
  const colors = Array.from({ length: categories.length }, getRandomColor);
  // let customLabels = categories.map(
  //   (label, index) => `${label}: ${chartData[index]}`
  // );
  const dataConfig = {
    labels: categories,
    datasets: [
      {
        label: "Rupees",
        data: chartData,
        backgroundColor: colors,
        // borderColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    // responsive: true,
    layout: {
      // padding: { top: 50 },
    },
    radius: 80,
    // maintainAspectRatio: true,
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        formatter: (value, ctx) => {
          const datapoints = ctx.chart.data.datasets[0].data;
          const total = datapoints.reduce(
            (total, datapoint) => total + datapoint,
            0
          );
          const percentage = (value / total) * 100;
          return percentage.toFixed(0) + "%";
        },
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 15,
        },
      },
      // title: {
      //   display: true,
      //   text: "Custom Chart Title",
      //   padding: {
      //     top: 10,
      //     bottom: 30,
      //   },
      // },
    },
  };

  return (
    // <div
    //   style={{
    //     width,
    //     maxHeight,
    //     border: "1px solid red",
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    <Pie
      data={dataConfig}
      options={options}
      maxHeight={"10%"}
      maxWidth={"100%"}
    />
    // {/* </div> */}
  );
};

export default PieChart;
