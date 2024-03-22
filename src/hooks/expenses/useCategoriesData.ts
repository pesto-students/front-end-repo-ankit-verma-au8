import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchAllCategories } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Category } from "@/types";

interface HookReturnData {
  data: Category[] | [];
  loading: boolean;
  error: boolean;
  success: boolean;
  fetchData: (month: number, year: number) => void;
}

const useCategoriesData = (): HookReturnData => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector(
    (state: RootState) => state.budget.categories
  );

  const getBudgetCategories = () => {
    dispatch(fetchAllCategories());
  };

  useEffect(() => {
    getBudgetCategories();
  }, []);

  return {
    data,
    loading,
    error,
    success,
    fetchData: getBudgetCategories,
  };
};

export default useCategoriesData;
