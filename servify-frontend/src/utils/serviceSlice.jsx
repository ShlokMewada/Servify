import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",

  initialState: {
    services: null,
    onlyServices: null,
    viewService: null,
    viewServiceCategory: null,
    employeeSignupCategories: null,
  },

  reducers: {
    addServices: (state, action) => {
      state.services = action.payload;
    },
    addOnlyServices: (state, action) => {
      state.onlyServices = action.payload;
    },
    viewService: (state, action) => {
      state.viewService = action.payload;
    },
    viewServiceCategory: (state, action) => {
      state.viewServiceCategory = action.payload;
    },
    addEmployeeSignupCategories: (state, action) => {
      state.employeeSignupCategories = action.payload;
    },
  },
});

export const {
  addServices,
  addOnlyServices,
  viewService,
  viewServiceCategory,
  addEmployeeSignupCategories,
} = serviceSlice.actions;

export default serviceSlice.reducer;
