import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = "/heroes";
const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await axios.get(api).catch((err) => {
    console.log("Error ", err);
  });
  return response.data;
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    createHero: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
      toast.success(`Hero ${action.payload.name} has been successfully created!`);
    },
    heroDelete: (state, action) => {      
      heroesAdapter.removeOne(state, action.payload.id);      
      toast.warn(`Hero ${action.payload.name} has been removed!`);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = heroesSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors(
  (state) => state.heroes
);

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  createHero,
  heroDelete,
} = actions;
