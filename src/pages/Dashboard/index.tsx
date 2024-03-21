import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpenseCategories from "./components/ExpenseCategories";
import SpendingTrends from "./components/SpendingTrends";
import LatestExpenses from "./components/LatestExpenses";
import StatusCard from "@/components/StatusCard";
import Card from "@/components/Card";
import useTotalExpenseData from "@/hooks/dashboard/userTotalExpenseData";

const GridBox = styled(Box)(({ theme }) => ({
  // backgroundColor: "bisque",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
          <GridBox>
            <Card sx={{ borderRadius: 2 }}>
              {loading && <CircularProgress />}
              {error && (
                <StatusCard
                  primary="There was a problem while fetching data"
                  type="error"
                />
              )}
              {!(error || loading) && Object?.keys(data).length !== 0 && (
                <Typography color="text.main" variant="h6">
                  Total Expenses (this month)
                  <br /> ₹ {data?.totalAmount}
                </Typography>
              )}
            </Card>
          </GridBox>
        </Grid>

        {/* Top Expenses Box */}
        <Grid item xs={12} sm={8}>
          <Typography color="text.main" variant="h5" sx={{ mb: 1 }}>
            Top Expenses of this month
          </Typography>
          <Grid container rowSpacing={{ xs: 2, sm: 0 }} columnSpacing={5}>
            <Grid item xs={12} sm={6}>
              <GridBox>
                <Card>
                  <Typography color="text.main" variant="body1">
                    16/2/24 <br />
                    Entertainment ₹13123423
                  </Typography>
                </Card>
              </GridBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <GridBox>
                <Card>
                  <Typography color="text.main" variant="body1">
                    16/2/24 <br />
                    Shopping ₹ 13123423
                  </Typography>
                </Card>
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
