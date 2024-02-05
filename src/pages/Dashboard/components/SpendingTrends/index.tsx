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

const SpendingTrends = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography display="inline">Spending Trends</Typography>
        <PeriodSwitcher />
      </Box>
      <BarChart />
    </Container>
  );
};

export default SpendingTrends;
