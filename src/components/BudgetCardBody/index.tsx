import { Typography, Box, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import BorderLinearProgress from "@/components/BorderLinearProgress";
import { getPercentageColor } from "@/utils";
import Card from "@/components/Card";

interface BudgetCardBodyProps {
  categoryName: string;
  amount: string;
  startDate: string;
  endDate: string;
  totalExpense: string;
}

const BudgetCardBody = ({
  categoryName,
  amount,
  startDate,
  endDate,
  totalExpense,
}: BudgetCardBodyProps) => {
  const expensePercentage = (Number(totalExpense) / Number(amount)) * 100;

  return (
    <Card>
      <Typography color="text.main" variant="h5" sx={{ textAlign: "center" }}>
        {categoryName}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <Avatar sx={{ bgcolor: red[900], width: 50, height: 50 }}>
          {categoryName[0]}
        </Avatar>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.main" variant="h6">
              ₹ {Number(totalExpense).toLocaleString("en-IN")}
            </Typography>
            <Typography color="text.main" variant="h6">
              ₹ {Number(amount).toLocaleString("en-IN")}
            </Typography>
          </Box>
          <Box sx={{ padding: "2px 0" }}>
            <BorderLinearProgress
              variant="determinate"
              value={expensePercentage > 100 ? 100 : expensePercentage}
              customcolor={getPercentageColor(
                Number(totalExpense),
                Number(amount)
              )}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.main" variant="h6">
              {new Date(startDate).toLocaleDateString()}
            </Typography>
            <Typography color="text.main" variant="h6">
              {new Date(endDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography sx={{ marginTop: "12px" }} color="text.main" variant="h6">
        Residue amount: ₹{" "}
        {(Number(amount) - Number(totalExpense)).toLocaleString("en-IN")}
      </Typography>
    </Card>
  );
};

export default BudgetCardBody;
