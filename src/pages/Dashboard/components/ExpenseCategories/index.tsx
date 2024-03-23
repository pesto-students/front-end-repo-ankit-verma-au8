import { Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "@/components/PieChart";
import MonthSwitcher from "../MonthSwitcher";
import useExpenseCategoriesData from "@/hooks/dashboard/useExpenseCategoriesData";
import Card from "@/components/Card";
import StatusCard from "@/components/StatusCard";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

const ChartContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "90%",
}));

const ExpenseCategories = () => {
  const { data, loading, error, fetchData } = useExpenseCategoriesData();
  return (
    <Card
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textAlign: "center",
      }}
    >
      <HeaderContainer>
        <Typography variant="h5" display="inline">
          Top Categories
        </Typography>
        <MonthSwitcher updateChartData={fetchData} />
      </HeaderContainer>
      <ChartContainer>
        {loading && <CircularProgress />}
        {error && (
          <StatusCard
            primary="There was a problem while fetching data"
            type="error"
          />
        )}
        {!(error || loading) && data?.categories.length === 0 && (
          <StatusCard
            primary="No data available for the selected period"
            type="info"
          />
        )}
        {!(error || loading) && data?.categories.length !== 0 && (
          <PieChart categories={data.categories} chartData={data.data} />
        )}
      </ChartContainer>
    </Card>
  );
};

export default ExpenseCategories;
