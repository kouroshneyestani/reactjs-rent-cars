import React, { createContext, useState, useEffect } from "react";
import { cars as initialCars, carBrands } from "../data";

// Create the context for cars data and actions
const CarsContext = createContext();

// CarsProvider component to manage and provide car data and filters
const CarsProvider = ({ children }) => {
    // State for the cars data
    const [cars, setCars] = useState(initialCars);

    // State for storing selected filters
    const [selectedFilters, setSelectedFilters] = useState({});

    // State for storing available models based on selected brands
    const [models, setModels] = useState([]);

    // State for storing available brand options
    const [brandOptions, setBrandOptions] = useState([]);

    // Effect to populate brand options on component mount
    useEffect(() => {
        setBrandOptions(
            carBrands.map((brand) => ({
                value: brand.name,
                label: `${brand.secondaryName} (${brand.name})`,
            }))
        );
    }, []);

    // Effect to update models when the selected brand filters change
    useEffect(() => {
        const selectedBrands = selectedFilters.brand || [];

        // Get models for selected brands
        const allModels = selectedBrands.flatMap((brandName) => {
            const brand = carBrands.find((b) => b.name === brandName);
            return brand
                ? brand.models.map((model) => ({
                      value: model.name,
                      label: `${brand.secondaryName} ${model.name}`,
                  }))
                : [];
        });

        // Ensure models are unique
        const uniqueModels = Array.from(
            new Set(allModels.map((model) => model.value))
        ).map((value) => allModels.find((model) => model.value === value));

        setModels(uniqueModels);
    }, [selectedFilters.brand]);

    // Function to handle filter changes
    const handleFilterChange = (name, value, checked) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (["brand", "model"].includes(name)) {
                newFilters[name] = checked
                    ? [...(newFilters[name] || []), value]
                    : (newFilters[name] || []).filter((item) => item !== value);
            } else {
                newFilters[name] = value;
            }
            return newFilters;
        });
    };

    // Function to check if a car matches the selected filters
    const isCarMatchingFilters = (car) => {
        const { city, state, brand, model, year, transmission, vehicleType } =
            selectedFilters;

        return (
            (!city || car.location.city === city) &&
            (!state || car.location.state === state) &&
            (!brand || brand.includes(car.details.brand)) &&
            (!model || model.includes(car.details.model)) &&
            (!year || car.details.year === year) &&
            (!transmission ||
                transmission.includes(car.details.transmission)) &&
            (!vehicleType || vehicleType.includes(car.details.type))
        );
    };

    // Filter cars based on the selected filters
    const filteredCars = cars.filter(isCarMatchingFilters);

    // Provide the state and functions to the rest of the app
    return (
        <CarsContext.Provider
            value={{
                cars: filteredCars,
                brandOptions,
                models,
                selectedFilters,
                handleFilterChange,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};

export { CarsProvider, CarsContext };
