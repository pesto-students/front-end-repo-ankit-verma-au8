import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BarChart from "@/components/BarChart";
import PeriodSwitcher from "../PeriodSwitcher";
// import useTrendsData from "@/hooks/dashboard/useTrendsData";
import Card from "@/components/Card";

// const Container = styled(Box)(({ theme }) => ({
//   // backgroundColor: "bisque",
//   ...theme.typography.body2,
//   padding: `${theme.spacing(2)}}`,
//   color: theme.palette.text.secondary,
// }));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const SpendingTrends = () => {
  // const { data, loading, error, success, fetchData } = useTrendsData("period");
  // console.log("IN bar COMPONENT", data);

  return (
    <Card>
      <HeaderContainer>
        <Typography variant="h5" display="inline">
          Spending Trends
        </Typography>
        <PeriodSwitcher />
      </HeaderContainer>
      <BarChart />
    </Card>
  );
};

export default SpendingTrends;
