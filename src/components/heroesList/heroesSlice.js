import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
//import { useHttp } from "../../hooks/http.hook";
import axios from "axios";

const api = "http://localhost:3001/heroes";
const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

// export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
//   const { request } = useHttp();
//   return request("http://localhost:3001/heroes");
// });

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await axios
    .get(api)
    .catch((err) => {
      console.log("Error ", err);
    });
    console.log(response.data)
  return response.data;
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    createHero: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroDelete: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
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
