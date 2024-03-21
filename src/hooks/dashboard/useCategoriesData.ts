import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchCategoriesData } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { getDate } from "@/utils";

interface HookReturnData {
  data: Accumulator;
  loading: boolean;
  error: boolean;
  success: boolean;
  fetchData: () => void;
}

interface Accumulator {
  categories: string[];
  data: number[];
}

const useCategoriesData = (): HookReturnData => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector(
    (state: RootState) => state.expense.categories
  );

  const accumulatorInitialValue: Accumulator = { categories: [], data: [] };

  const formattedData: Accumulator =
    data?.reduce((acc: Accumulator, curr: any) => {
      return {
        categories: [...acc.categories, curr.categoryName],
        data: [...acc.data, Number(curr.totalExpense)],
      };
    }, accumulatorInitialValue) || accumulatorInitialValue;

  const getCategoriesData = () => {
    const date = getDate(1) as Date;
    dispatch(
      fetchCategoriesData({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      })
    );
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return {
    data: formattedData ?? accumulatorInitialValue,
    loading,
    error,
    success,
    fetchData: getCategoriesData,
  };
};

export default useCategoriesData;
