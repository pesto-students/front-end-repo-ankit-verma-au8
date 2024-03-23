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

const ChartContainer = styled(Box)(() => ({
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  // height: "90%",
  // width: "100%",
}));

const SpendingTrends = () => {
  const { data, loading, error, fetchData } = useTrendsData();

  const doesDataExist = () => {
    return data?.some((item) => item.data.length > 0);
  };

  return (
    <Card>
      <HeaderContainer>
        <Typography variant="h5" display="inline">
          Spending Trends
        </Typography>
        <PeriodSwitcher updateChartData={fetchData} />
      </HeaderContainer>
      <ChartContainer>
        {loading && <CircularProgress />}
        {error && (
          <Card sx={{ textAlign: "center" }}>
            <StatusCard
              primary="There was a problem while fetching data"
              type="error"
              primaryStyle={{ textAlign: "center" }}
              secondaryStyle={{ height: "80px" }}
            />
          </Card>
        )}
        {!(error || loading) && !doesDataExist() && (
          <StatusCard
            primary="No data available for the selected period"
            type="info"
            primaryStyle={{ textAlign: "center" }}
            secondaryStyle={{ height: "80px" }}
          />
        )}
        {!(error || loading) && doesDataExist() && <BarChart data={data} />}
      </ChartContainer>
    </Card>
  );
};

export default SpendingTrends;
