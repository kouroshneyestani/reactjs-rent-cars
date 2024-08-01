import { createSlice } from "@reduxjs/toolkit";
import { cars as initialCars } from "../data";

// Create a slice for managing car data
const carSlice = createSlice({
    name: "cars", // Name of the slice
    initialState: {
        list: initialCars, // Initialize with static car data
    },
    reducers: {
        setCars: (state, action) => {
            // Reducer function to update car list
            state.list = action.payload;
        },
    },
});

export const { setCars } = carSlice.actions; // Export action creator
export default carSlice.reducer; // Export reducer to configure the store
