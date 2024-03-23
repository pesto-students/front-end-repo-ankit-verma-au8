/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBudgets } from "@/api/features/budget";
import { getAllExpenseCategories } from "@/api";
import { Budget, Category } from "@/types";

interface BudgetState {
  budgets: {
    data: Budget[] | [];
    error: any;
    success: boolean;
    loading: boolean;
  };
  categories: {
    data: Category[] | [];
    error: any;
    success: boolean;
    loading: boolean;
  };
}

const initialState: BudgetState = {
  budgets: {
    data: [],
    error: "",
    success: false,
    loading: false,
  },
  categories: {
    data: [],
    error: "",
    success: false,
    loading: false,
  },
};

const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllBudgets();
      data.sort((a: Budget, b: Budget) => {
        const diffA = parseInt(a.amount) - parseInt(a.totalExpense);
        const diffB = parseInt(b.amount) - parseInt(b.totalExpense);
        return diffA - diffB;
      });
      return data;
    } catch (err: any) {
      const message = err.response.data;
      return rejectWithValue(message);
    }
  }
);

const fetchAllCategories = createAsyncThunk(
  "budget/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllExpenseCategories();
      return data;
    } catch (err: any) {
      const message = err.response.data;
      return rejectWithValue(message);
    }
  }
);

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.budgets.loading = true;
        state.budgets.error = "";
        state.budgets.success = false;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.budgets.data = action.payload;
        state.budgets.loading = false;
        state.budgets.error = "";
        state.budgets.success = true;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.budgets.loading = false;
        state.budgets.error = action.payload;
        state.budgets.success = false;
      });

    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.categories.loading = true;
        state.categories.error = "";
        state.categories.success = false;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories.data = action.payload;
        state.categories.loading = false;
        state.categories.error = "";
        state.categories.success = true;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.categories.loading = false;
        state.categories.error = action.payload;
        state.categories.success = false;
      });
  },
});

export { fetchBudgets, fetchAllCategories };
export default budgetSlice.reducer;
