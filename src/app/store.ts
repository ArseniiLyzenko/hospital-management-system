import { configureStore } from "@reduxjs/toolkit";
import hospitalsReducer from "../features/hospitalsList/hospitalsSlice";

export const store = configureStore({
  reducer: {
    hospitals: hospitalsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch