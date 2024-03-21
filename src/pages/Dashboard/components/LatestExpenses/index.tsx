import { Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
import ExpenseList from "@/components/ExpenseList";
import Card from "@/components/Card";
import { useRef } from "react";

// const Container = styled(Box)(({ theme }) => ({
//   backgroundColor: "bisque",
//   ...theme.typography.body2,
//   padding: `${theme.spacing(2)}}`,
//   color: theme.palette.text.secondary,
// }));

const LatestExpenses = () => {
  const expenseList = useRef([
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "31/1/24",
    },
    {
      category:
        "UtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtility",
      message:
        "Spent 2000 on floor repairSpent 2000 on floor repairSpent 2000 on floor repairSpent 2000 on floor repair",
      expense: 2000,
      date: "29/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "27/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "25/1/24",
    },
    {
      category: "Utility",
      message: "Spent 2000 on floor repair",
      expense: 2000,
      date: "23/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "21/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "19/1/24",
    },
    {
      category: "Utility",
      message: "Spent 2000 on floor repair",
      expense: 2000,
      date: "17/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "15/1/24",
    },
    {
      category: "Utility",
      message: "Spent 2000 on floor repair",
      expense: 2000,
      date: "13/1/24",
    },
  ]);
  return (
    <Card>
      <Typography variant="h5" display="inline">
        Latest Expenses
      </Typography>
      <ExpenseList expenses={expenseList.current} />
    </Card>
  );
};

export default LatestExpenses;
