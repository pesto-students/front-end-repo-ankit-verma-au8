import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchCategoriesData } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";

interface APIData {
  categoryName: string;
  totalExpense: string;
  categoryId: number;
}

interface Accumulator {
  categories: string[];
  data: number[];
}

const useCategoriesData = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector(
    (state: RootState) => state.expense.categories
  );

  const accumulatorInitialValue: Accumulator = { categories: [], data: [] };

  const formattedData = data?.reduce((acc: any, curr: any) => {
    return {
      categories: [...acc.categories, curr.categoryName],
      data: [...acc.data, Number(curr.totalExpense)],
    };
  }, accumulatorInitialValue);

  const getCategoriesData = () => {
    dispatch(fetchCategoriesData({ month: 1, year: 2024 }));
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
