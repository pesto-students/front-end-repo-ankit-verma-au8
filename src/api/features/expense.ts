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
  page: number,
  from: string,
  to: string,
  categoryId: number | null,
  limit: number | null = 20
) => {
  const { data } = await axiosInstance.get(`${USER_ENDPOINT}s/list`, {
    params: {
      limit,
      page,
      categoryId,
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
    },
  });
  return data;
};

export const getAllExpenseCategories = async () => {
  const { data } = await axiosInstance.get(`expense/categories`);
  return data;
};

export const getTotalExpense = async (month: number, year: number) => {
  const { data } = await axiosInstance.get(`${USER_ENDPOINT}/total`, {
    params: { month, year },
  });

  return data;
};
