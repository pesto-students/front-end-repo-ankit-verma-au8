/* eslint-disable @typescript-eslint/no-explicit-any */
import BudgetCard from "@/components/BudgetCard";
import BudgetDialog from "@/components/BudgetDialog";
import { RootState } from "@/store";
import { fetchBudgets } from "@/store/slices/budget";
import { Box, Button } from "@mui/material";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Budget {
  amount: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  endDate: string;
  id: string;
  reminders: boolean;
  startDate: string;
  totalExpense: string;
  userId: number;
}
const Budget = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const {
    budgets: { data },
  } = useSelector((state: RootState) => state.budget);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexGrow: 1,
          marginBottom: "15px",
        }}
      >
        <Button onClick={handleClickOpen} variant="contained">
          Add Budget
        </Button>
      </Box>
      <BudgetDialog open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          // maxWidth: "1030px",
        }}
      >
        {data.length != 0
          ? data.map(
              ({
                startDate,
                endDate,
                amount,
                totalExpense,
                categoryName,
                reminders,
                id,
                categoryId,
              }: Budget) => (
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
