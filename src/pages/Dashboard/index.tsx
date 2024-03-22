import { Grid, Typography, CircularProgress } from "@mui/material";
import ExpenseCategories from "./components/ExpenseCategories";
import SpendingTrends from "./components/SpendingTrends";
import LatestExpenses from "./components/LatestExpenses";
import TopExpenses from "./components/TopExpenses";
import StatusCard from "@/components/StatusCard";
import Card from "@/components/Card";
import useTotalExpenseData from "@/hooks/dashboard/userTotalExpenseData";

const Dashboard = () => {
  const { data, loading, error } = useTotalExpenseData();
  return (
    <>
      <Grid container spacing={5}>
        {/* Total Expense Box */}
        <Grid item xs={12} sm={4}>
          <Typography color="text.main" variant="h5" sx={{ mb: 1 }}>
            Total Expenses
          </Typography>
          <Card
            sx={{
              textAlign: "center",
            }}
          >
            {loading && <CircularProgress />}
            {error && (
              <StatusCard
                primary="There was a problem while fetching data"
                type="error"
              />
            )}
            {!(error || loading) && Object?.keys(data).length !== 0 && (
              <Typography color="text.primary" variant="h6">
                Total Expenses (this month)
                <br /> ₹ {data?.totalAmount}
              </Typography>
            )}
          </Card>
        </Grid>

        {/* Top Expenses Box */}
        <Grid item xs={12} sm={8}>
          <TopExpenses />
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
              <ExpenseCategories />
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
