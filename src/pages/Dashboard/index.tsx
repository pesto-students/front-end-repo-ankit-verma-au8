import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpenseCategories from "./components/ExpenseCategories";
import SpendingTrends from "./components/SpendingTrends";
import LatestExpenses from "./components/LatestExpenses";

const GridBox = styled(Box)(({ theme }) => ({
  backgroundColor: "bisque",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const PieChartCategories = [
    "Utilties",
    "Entertainment",
    "Food",
    "Medical Bills",
  ];
  const PieChartData = [1, 2, 3, 5];
  return (
    <>
      <Grid container spacing={5}>
        {/* Total Expense Box */}
        <Grid item xs={12} sm={4}>
          Total Expenses
          <GridBox>
            Top Expenses(this month)
            <br /> ₹ 13123423
          </GridBox>
        </Grid>

        {/* Top Expenses Box */}
        <Grid item xs={12} sm={8}>
          Top Expenses of this month
          <Grid container rowSpacing={{ xs: 2, sm: 0 }} columnSpacing={5}>
            <Grid item xs={12} sm={6}>
              <GridBox>
                16/2/24 <br /> Entertainment ₹ 13123423
              </GridBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <GridBox>
                16/2/24 <br /> Shopping ₹ 13123423
              </GridBox>
            </Grid>
          </Grid>
        </Grid>

        {/* Charts Box */}
        <Grid item xs={12} sm={6}>
          <Grid container rowSpacing={{ xs: 2 }} columnSpacing={5}>
            {/* Barchart */}
            <Grid item xs={12} sx={{ p: 0 }}>
              <SpendingTrends />
            </Grid>

            {/* Piechart */}
            <Grid item xs={12}>
              <ExpenseCategories
                categories={PieChartCategories}
                data={PieChartData}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Expenses List Box */}
        <Grid item xs={12} sm={6}>
          <LatestExpenses />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
