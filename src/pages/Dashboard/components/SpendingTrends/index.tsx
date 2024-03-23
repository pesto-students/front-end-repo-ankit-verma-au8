import { Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import BarChart from "@/components/BarChart";
import PeriodSwitcher from "../PeriodSwitcher";
import useTrendsData from "@/hooks/dashboard/useTrendsData";
import Card from "@/components/Card";
import StatusCard from "@/components/StatusCard";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const SpendingTrends = () => {
  const { data, loading, error, fetchData } = useTrendsData();
  console.log("IN bar COMPONENT", data);

  return (
    <Card>
      <HeaderContainer>
        <Typography variant="h5" display="inline">
          Spending Trends
        </Typography>
        <PeriodSwitcher updateChartData={fetchData} />
      </HeaderContainer>
      {loading && <CircularProgress />}
      {error && (
        <StatusCard
          primary="There was a problem while fetching data"
          type="error"
        />
      )}
      {!(error || loading) && data?.length === 0 && (
        <StatusCard
          primary="No data available for the selected period"
          type="info"
        />
      )}
      <BarChart data={data} />
    </Card>
  );
};

export default SpendingTrends;
