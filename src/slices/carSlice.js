import { createSlice } from "@reduxjs/toolkit";
import { cars as initialCars } from "../data";

const carSlice = createSlice({
    name: "cars",
    initialState: {
        list: initialCars,
        filters: {
            priceRange: "",
            pricePerDay: "",
            state: "",
            city: "",
            year: [],
            fuelType: "",
            transmission: "",
            capacity: "",
            color: [],
            features: [],
            brands: [],
            models: [],
        },
        filteredCars: initialCars, // Initial filtered cars state
    },
    reducers: {
        setCars: (state, action) => {
            state.list = action.payload;
        },
        setFilters: (state, action) => {
            const { filteredCars, ...filters } = action.payload;
            state.filters = filters;
            state.filteredCars = filteredCars || state.filteredCars; // Update filteredCars
        },
        clearFilters: (state) => {
            state.filters = {
                priceRange: "",
                pricePerDay: "",
                state: "",
                city: "",
                year: [],
                fuelType: "",
                transmission: "",
                capacity: "",
                color: [],
                features: [],
                brands: [],
                models: [],
            };
            state.filteredCars = state.list; // Clear filters and show all cars
        },
    },
});

export const { setCars, setFilters, clearFilters } = carSlice.actions;
export default carSlice.reducer;
