import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store";
import {IHospital, THospitalId} from "../../types";
import {HARDCODED_HOSPITALS} from "../../constants";

const initialState: {
  isLoading: boolean;
  error: string | undefined;
  data: IHospital[];
} = {
  isLoading: false,
  error: "",
  data: [],
};

export const fetchHospitals = createAsyncThunk(
  "hospitals/fetchHospitals",
  async () => {
    return await mockHospitalsFetch();
  }
);

const mockHospitalsFetch = (): Promise<IHospital[]> => {
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve(HARDCODED_HOSPITALS), 3000));
};

export const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    updateHospital: (state, action: PayloadAction<IHospital>) => {
      const index = state.data.findIndex((hospital) => hospital.id === action.payload.id);
      state.data[index] = action.payload;
    },
    deleteHospitalById: (state, action: PayloadAction<THospitalId>) => {
      state.data = state.data.filter((hospital) => hospital.id !== action.payload);
    },
    addHospital: (state) => {
      state.data.push({
        id: Date.now(),
        hospitalName: "",
        streetLine1: "",
        streetLine2: "",
        city: "",
        state: "",
        zip: "",
        contactPerson: "",
        contactCellphone: "",
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHospitals.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(fetchHospitals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchHospitals.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
})

export const { updateHospital, deleteHospitalById, addHospital } = hospitalsSlice.actions;

export const selectHospitals = (state: RootState) => state.hospitals.data;
export const selectIsLoading = (state: RootState) => state.hospitals.isLoading;
export const selectError = (state: RootState) => state.hospitals.error;

export default hospitalsSlice.reducer;

