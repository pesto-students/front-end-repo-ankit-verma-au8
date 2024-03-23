import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchBudgets } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Budget } from "@/types";

interface HookReturnData {
  data: Budget[] | [];
  loading: boolean;
  error: boolean;
  success: boolean;
  fetchData: (month: number, year: number) => void;
}

const useTopExpensesData = (): HookReturnData => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector(
    (state: RootState) => state.budget.budgets
  );

  const getBudgetData = () => {
    dispatch(fetchBudgets());
  };

  useEffect(() => {
    getBudgetData();
  }, []);

  return {
    data,
    loading,
    error,
    success,
    fetchData: getBudgetData,
  };
};

export default useTopExpensesData;
