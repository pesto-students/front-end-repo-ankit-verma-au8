import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchListData } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getDate } from "@/utils";

interface HookReturnData {
  data: any;
  loading: boolean;
  error: boolean;
  success: boolean;
  fetchData: any;
  //   (
  //     page: number,
  //     from: string,
  //     to: string,
  //     categoryId?: number | null,
  //     limit?: number | null
  //   ) => void;
}

const useExpenseListData = (): HookReturnData => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector((state: RootState) => {
    return {
      ...state.expense?.list,
      data: {
        ...state.expense?.list?.data,
        data: state.expense?.list?.data?.data?.map?.((item: any) => {
          return {
            ...item,
            createdAt: dayjs(item.createdAt).format("DD/MM/YYYY"),
          };
        }),
      },
    };
  });

  const getExpenseListData = (
    page: number,
    from: string | null,
    to: string | null,
    categoryId: number | null,
    limit: number | null = 10
  ) => {
    dispatch(fetchListData({ limit, page, from, to, categoryId }));
  };

  useEffect(() => {
    let fromDate = dayjs(getDate(1));
    let toDate = dayjs(getDate(1, false, true));
    getExpenseListData(
      1,
      fromDate.format("MM/DD/YYYY"),
      toDate.format("MM/DD/YYYY"),
      null,
      10
    );
  }, []);

  return {
    data,
    loading,
    error,
    success,
    fetchData: getExpenseListData,
  };
};

export default useExpenseListData;
