import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",

  initialState: {
    employeeProfile: null,
    serviceRequests: null,
  },

  reducers: {
    addServiceRequests: (state, action) => {
      state.serviceRequests = action.payload;
    },
    addEmployeeProfile: (state, action) => {
      state.employeeProfile = action.payload;
    },
  },
});

export const { addServiceRequests, addEmployeeProfile } = employeeSlice.actions;

export default employeeSlice.reducer;
