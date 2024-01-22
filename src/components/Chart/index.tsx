import { Pie } from "react-chartjs-2";
import { getRandomColor } from "@/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  maxHeight: number | string;
  maxWidth: number | string;
};

const Chart = ({ maxHeight = "100%", maxWidth = "100%" }: ChartProps) => {
  const categories = ["Utilties", "Entertainment", "Food", "Medical Bills"];
  const colors = Array.from({ length: categories.length }, getRandomColor);
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Rupees",
        data: [1, 2, 3, 4],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth, maxHeight }}>
      <Pie data={data} />;
    </div>
  );
};

export default Chart;
