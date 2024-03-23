import { Pie } from "react-chartjs-2";
import { getRandomColor } from "@/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabel from "chartjs-plugin-datalabels";
import { styled } from "@mui/material/styles";
import { useTheme, useMediaQuery } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabel);

type PieChartProps = {
  categories: Array<string> | [];
  chartData: Array<number> | [];
};

const ChartContainer = styled("div")(({ theme }) => ({
  height: "30vh",
  maxWidth: "99%",
  display: "flex",
  justifyContent: "center",
  [`${theme.breakpoints.up("md")}`]: {
    height: "50vh",
    maxWidth: "100%",
  },
}));

const PieChart = ({ categories, chartData }: PieChartProps) => {
  const colors = Array.from({ length: categories.length }, getRandomColor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dataConfig = {
    labels: categories,
    datasets: [
      {
        label: "Rupees",
        data: chartData,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 80,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    radius: isMobile ? 70 : 150,
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: isMobile ? 10 : 15,
        },
        formatter: (value: any, ctx: any) => {
          const datapoints = ctx.chart.data.datasets[0].data;
          const total = datapoints.reduce(
            (total: number, datapoint: number) => total + datapoint,
            0
          );
          const percentage = (value / total) * 100;
          return percentage.toFixed(0) + "%";
        },
      },
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 15,
          padding: isMobile ? 5 : 10,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Pie data={dataConfig} options={options} />
    </ChartContainer>
  );
};

export default PieChart;
