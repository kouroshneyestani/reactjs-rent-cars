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
    },
    reducers: {
        setCars: (state, action) => {
            state.list = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
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
        },
    },
});

export const { setCars, setFilters, clearFilters } = carSlice.actions;
export default carSlice.reducer;
