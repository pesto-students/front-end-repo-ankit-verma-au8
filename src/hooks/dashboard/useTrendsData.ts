import { useSelector, useDispatch } from "react-redux";
import { RootState, fetchTrendsData } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";

const useTrendsData = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data, loading, error, success } = useSelector(
    (state: RootState) => state.expense.trends
  );

  const getTrendsData = () => {
    dispatch(fetchTrendsData({ limit: 8, page: 1 }));
  };
  console.log("IN trends CUSTOM NOW");

  useEffect(() => {
    console.log("IN useeffect of CUSTOM hook bars");
    getTrendsData();
  }, []);

  return {
    data,
    loading,
    error,
    success,
    fetchData: getTrendsData,
  };
};

export default useTrendsData;
