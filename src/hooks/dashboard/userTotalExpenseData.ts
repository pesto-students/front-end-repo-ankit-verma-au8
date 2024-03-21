import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchTotalExpenseData } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getDate } from "@/utils";

interface HookReturnData {
  data: {
    month: string;
    totalAmount: string | number;
    year: string;
  };
  loading: boolean;
  error: boolean;
  success: boolean;
}

const useTotalExpenseData = (): HookReturnData => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector(
    (state: RootState) => state.expense.total
  );

  const getCategoriesData = () => {
    const date = getDate(1) as Date;
    dispatch(
      fetchTotalExpenseData({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      })
    );
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return {
    data: {
      ...data,
      ...(data &&
        Object?.keys(data).length && {
          totalAmount: Number(data?.totalAmount).toLocaleString("en-IN"),
        }),
    },
    loading,
    error,
    success,
  };
};

export default useTotalExpenseData;
