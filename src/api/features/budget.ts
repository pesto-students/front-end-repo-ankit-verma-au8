import axiosInstance from "@/api/axiosInstance";

const BUDGET_ENDPOINT = "/user/budget";

export const getAllBudgets = async () => {
  const { data } = await axiosInstance.get(BUDGET_ENDPOINT);
  return data;
};

interface CreateBudgetPayload {
  categoryId: number;
  amount: number;
  reminders: boolean;
}

interface UpdateBudgetPayload {
  categoryId?: number;
  amount?: number;
  reminders?: boolean;
}

export const createBudget = async (budgetData: CreateBudgetPayload) => {
  const { data } = await axiosInstance.post(BUDGET_ENDPOINT, budgetData);
  return data;
};

export const updateBudget = async (
  budgetData: UpdateBudgetPayload,
  budgetId: string
) => {
  const { data } = await axiosInstance.put(
    `${BUDGET_ENDPOINT}/${budgetId}`,
    budgetData
  );
  return data;
};
