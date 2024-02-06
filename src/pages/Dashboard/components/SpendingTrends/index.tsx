import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BarChart from "@/components/BarChart";
import PeriodSwitcher from "../PeriodSwitcher";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "bisque",
  ...theme.typography.body2,
  padding: `${theme.spacing(2)}}`,
  color: theme.palette.text.secondary,
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const SpendingTrends = () => {
  return (
    <Container>
      <HeaderContainer>
        <Typography display="inline">Spending Trends</Typography>
        <PeriodSwitcher />
      </HeaderContainer>
      <BarChart />
    </Container>
  );
};

export default SpendingTrends;
