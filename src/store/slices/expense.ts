import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getExpenseTrends,
  getExpenseCategories,
  getExpenseList,
  getTotalExpense,
} from "@/api";

interface IExpenseState {
  trends: {
    data: {
      data: [];
      startDate: string;
      endDate: string;
    }[];
    error: any;
    success: boolean;
    loading: boolean;
  };
  categories: {
    data: null | object[] | [];
    error: any;
    success: boolean;
    loading: boolean;
  };
  list: {
    data: {
      data: {
        amount: string;
        categoryName: string;
        createdAt: string;
        id: number;
        textMessage: string;
      }[];
      totalCount: number;
    };
    error: any;
    success: boolean;
    loading: boolean;
  };
  total: {
    data: {
      month: string;
      year: string;
      totalAmount: number;
    } | null;
    error: any;
    success: boolean;
    loading: boolean;
  };
  top?: any;
}

const initialState: IExpenseState = {
  trends: {
    data: [],
    error: false,
    success: false,
    loading: false,
  },
  categories: {
    data: null,
    error: false,
    success: false,
    loading: false,
  },
  list: {
    data: { data: [], totalCount: 0 },
    error: false,
    success: false,
    loading: false,
  },
  total: {
    data: null,
    error: false,
    success: false,
    loading: false,
  },
};

const fetchTrendsData = createAsyncThunk(
  "expense/fetchTrendsData",
  async ({ interval }: { interval: string }, { rejectWithValue }) => {
    try {
      const data = await getExpenseTrends(interval);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchCategoriesData = createAsyncThunk(
  "expense/fetchCategoriesData",
  async (
    { month, year }: { month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await getExpenseCategories(month, year);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchListData = createAsyncThunk(
  "expense/fetchListData",
  async (
    {
      page,
      from = null,
      to = null,
      categoryId = null,
      limit,
    }: {
      page: number;
      from: string | null;
      to: string | null;
      categoryId: number | null;
      limit?: number | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await getExpenseList(page, from, to, categoryId, limit);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchTotalExpenseData = createAsyncThunk(
  "expense/fetchTotalExpenseData",
  async (
    {
      month,
      year,
    }: {
      month: number;
      year: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await getTotalExpense(month, year);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendsData.pending, (state) => {
        state.trends.loading = true;
        state.trends.error = false;
        state.trends.success = false;
      })
      .addCase(fetchTrendsData.fulfilled, (state, action) => {
        state.trends.data = action.payload;

        state.trends.loading = false;
        state.trends.error = false;
        state.trends.success = true;
      })
      .addCase(fetchTrendsData.rejected, (state, action) => {
        state.trends.loading = false;
        state.trends.error = action.payload;
        state.trends.success = false;
      });

    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.categories.loading = true;
        state.categories.error = false;
        state.categories.success = false;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        // console.log("CATEGORYFETCHED", action);
        state.categories.data = action.payload.categoryPercentage;

        state.categories.loading = false;
        state.categories.error = false;
        state.categories.success = true;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.categories.loading = false;
        state.categories.error = action.payload;
        state.categories.success = false;
      });

    builder
      .addCase(fetchListData.pending, (state) => {
        state.list.loading = true;
        state.list.error = false;
        state.list.success = false;
      })
      .addCase(fetchListData.fulfilled, (state, action) => {
        // console.log("LISTFETCHED", action);
        state.list.data = action.payload;

        state.list.loading = false;
        state.list.error = false;
        state.list.success = true;
      })
      .addCase(fetchListData.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
        state.list.success = false;
      });

    builder
      .addCase(fetchTotalExpenseData.pending, (state) => {
        state.total.loading = true;
        state.total.error = false;
        state.total.success = false;
      })
      .addCase(fetchTotalExpenseData.fulfilled, (state, action) => {
        state.total.data = action.payload.totalExpense[0];

        state.total.loading = false;
        state.total.error = false;
        state.total.success = true;
      })
      .addCase(fetchTotalExpenseData.rejected, (state, action) => {
        state.total.loading = false;
        state.total.error = action.payload;
        state.total.success = false;
      });
  },
});

export {
  fetchTrendsData,
  fetchCategoriesData,
  fetchListData,
  fetchTotalExpenseData,
};

export default expenseSlice.reducer;
