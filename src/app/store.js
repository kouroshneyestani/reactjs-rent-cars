import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../slices/carSlice"; // Import car slice reducer

// Configure the Redux store
export const store = configureStore({
    reducer: {
        cars: carReducer, // Add car reducer to the store
    },
});
