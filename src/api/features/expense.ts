import axiosInstance from "@/api/axiosInstance";

const USER_ENDPOINT = "/user/expense";

export const getExpenseTrends = async (page: number, limit: number) => {
  //   const queryString = buildQueryString({page, limit});

  const { data } = await axiosInstance.get(`${USER_ENDPOINT}/trend`, {
    params: { limit, page },
  });
  return data;
};

export const getExpenseCategories = async (month: number, year: number) => {
  //   const queryString = buildQueryString({page, limit});

  const { data } = await axiosInstance.get(`${USER_ENDPOINT}/categories`, {
    params: { month, year },
  });
  return data;
};

export const getExpenseList = async (
  userId: number,
  limit: number,
  page: number,
  categoryId: number,
  from: number,
  to: number
) => {
  //   const queryString = buildQueryString({page, limit});

  const { data } = await axiosInstance.get(`${USER_ENDPOINT}/list`, {
    params: { userId, limit, page, categoryId, from, to },
  });
  return data;
};
