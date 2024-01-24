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

  return (
    <div style={{ maxWidth, maxHeight }}>
      <Pie data={data} />;
    </div>
  );
};

export default Chart;
