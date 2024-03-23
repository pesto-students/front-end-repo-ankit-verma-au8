import { Typography, Grid, CircularProgress } from "@mui/material";
import Card from "@/components/Card";
import BudgetCardBody from "@/components/BudgetCardBody";
import StatusCard from "@/components/StatusCard";
import useTopExpensesData from "@/hooks/dashboard/useTopExpensesData";

const TopExpenses = () => {
  const { data, loading, error } = useTopExpensesData();
  return (
    <>
      <Typography color="text.main" variant="h5" sx={{ mb: 1 }}>
        Top Expenses of this month
      </Typography>
      <Grid container rowSpacing={{ xs: 2, sm: 0 }} columnSpacing={5}>
        {loading && (
          <Grid item xs={12} sm={6}>
            <Card sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Card>
          </Grid>
        )}
        {error && (
          <Grid item xs={12} sm={6}>
            <Card sx={{ textAlign: "center" }}>
              <StatusCard
                primary="There was a problem while fetching data"
                type="error"
                primaryStyle={{ textAlign: "center" }}
                secondaryStyle={{ height: "105px" }}
              />
            </Card>
          </Grid>
        )}
        {!(error || loading) && data?.length === 0 && (
          <Grid item xs={12} sm={6}>
            <Card sx={{ textAlign: "center" }}>
              <StatusCard
                primary="No budgets available"
                type="info"
                primaryStyle={{ textAlign: "center" }}
                secondaryStyle={{ height: "105px" }}
              />
            </Card>
          </Grid>
        )}
        {!(error || loading) &&
          data?.length !== 0 &&
          data
            .slice(0, 2)
            .map(
              ({ categoryName, amount, startDate, endDate, totalExpense }) => (
                <Grid key={categoryName} item xs={12} sm={6}>
                  <BudgetCardBody
                    categoryName={categoryName}
                    amount={amount}
                    startDate={startDate}
                    endDate={endDate}
                    totalExpense={totalExpense}
                  />
                </Grid>
              )
            )}
      </Grid>
    </>
  );
};

export default TopExpenses;
