import { getAllBudgets } from "@/api/features/budget";
import BudgetCard from "@/components/BudgetCard";
import BudgetDialog from "@/components/BudgetDialog";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const Budget = () => {
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    (async () => {
      const data = await getAllBudgets();
      setBudgets(data);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BudgetDialog open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "1030px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "1030px",
            marginBottom: "15px",
          }}
        >
          <Button onClick={handleClickOpen} variant="contained">
            Add Budget
          </Button>
        </Box>
        {budgets.length != 0
          ? budgets.map(
              ({
                startDate,
                endDate,
                amount,
                totalExpense,
                categoryName,
                reminders,
                id,
                categoryId,
              }) => (
                <BudgetCard
                  id={id}
                  startDate={startDate}
                  endDate={endDate}
                  amount={amount}
                  totalExpense={totalExpense}
                  categoryName={categoryName}
                  categoryId={categoryId}
                  key={categoryName}
                  reminders={reminders}
                />
              )
            )
          : null}
      </Box>
    </Box>
  );
};

export default Budget;
