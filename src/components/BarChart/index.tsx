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
import dayjs from "dayjs";

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

interface BarChartProps {
  data: {
    data: [];
    startDate: string;
    endDate: string;
  }[];
}

const BarChart = ({ data: trendsData }: BarChartProps) => {
  const categoryWiseData = new Map();

  trendsData?.forEach((data) => {
    // console.log({ startDate: data.startDate, idx: i });
    if (data?.data?.length === 0) return;

    data?.data?.forEach(({ categoryName, totalExpense }) => {
      if (categoryWiseData.has(categoryName)) {
        let oldItems = categoryWiseData.get(categoryName);
        // console.log("olditems", oldItems);
        categoryWiseData.set(categoryName, [...oldItems, Number(totalExpense)]);
      } else {
        categoryWiseData.set(categoryName, []);
      }
    });
  });

  // console.log("categoryWiseData:", categoryWiseData);
  const newLabelData: object[] = [];

  categoryWiseData.forEach((values, categoryName) => {
    // console.log(values, categoryName);
    newLabelData.push({
      label: categoryName,
      data: values,
      clip: 5,
      backgroundColor: getRandomColor(),
    });
  });

  const cat1Data = [6, 64, 673, 35, 54];
  const cat2Data = [45, 235, 978, 2345, 262];
  const cat3Data = [32, 76, 245, 9867, 543];
  const allData = [...cat1Data, ...cat2Data, ...cat3Data];
  const data = {
    labels: trendsData?.map(({ startDate, endDate }) => {
      // console.log({ raw: startDate, processed: dayjs(startDate) });
      if (startDate === endDate) {
        return dayjs(startDate).format("DD/MM/YYYY");
      }
      return `${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(
        endDate
      ).format("DD/MM/YYYY")}`;
    }),
    datasets: newLabelData,
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
  console.log("DATA in bar", data);

  return (
    <ChartContainer>
      <Bar
        options={options}
        data={{ datasets: data.datasets as [], labels: data.labels }}
      />
    </ChartContainer>
  );
};

export default BarChart;
