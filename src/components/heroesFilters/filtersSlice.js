import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: "idle",
  activeFilter: "all",
});

export const fetchFilters = createAsyncThunk("filtres/fetchFilters", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        filtersAdapter.setAll(state, action.payload);
        //state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors(
  (state) => state.filters
);
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;