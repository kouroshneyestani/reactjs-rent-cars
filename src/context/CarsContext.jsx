import React, { createContext, useState, useMemo } from "react";
import { cars, carBrands } from "../data";

// Create Context
export const CarsContext = createContext();

// Create Provider
export const CarsProvider = ({ children }) => {
    // State for cars and filters
    const [selectedFilters, setSelectedFilters] = useState({
        brand: [],
        model: [],
        year: [],
        vehicleType: [],
        transmission: [],
    });

    // Extract brand options and model options from carBrands
    const brandOptions = useMemo(
        () =>
            carBrands.map((brand) => ({
                value: brand.name,
                label: brand.secondaryName,
            })),
        []
    );

    const modelOptions = useMemo(
        () =>
            carBrands.flatMap((brand) =>
                brand.models.map((model) => ({
                    value: model.name,
                    label: model.secondaryName,
                }))
            ),
        []
    );

    // Filter cars based on selected filters
    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            const { brand, model, year, vehicleType, transmission } =
                selectedFilters;

            // Check brand filter
            const brandMatches =
                brand.length === 0 || brand.includes(car.details.brand);

            // Check model filter
            const modelMatches =
                model.length === 0 || model.includes(car.details.model);

            // Check year filter
            const yearMatches =
                year.length === 0 || year.includes(car.details.year.toString());

            // Check vehicleType filter
            const vehicleTypeMatches =
                vehicleType.length === 0 ||
                (vehicleType.includes("luxury") &&
                    car.details.brand === "Mercedes Benz") ||
                (vehicleType.includes("suv") &&
                    (car.details.model.includes("Rav4") ||
                        car.details.model.includes("Discovery"))) ||
                (vehicleType.includes("economy") &&
                    (car.details.model.includes("Corolla") ||
                        car.details.model.includes("Sunny")));

            // Check transmission filter
            const transmissionMatches =
                transmission.length === 0 ||
                transmission.includes(car.details.transmission.toLowerCase());

            return (
                brandMatches &&
                modelMatches &&
                yearMatches &&
                vehicleTypeMatches &&
                transmissionMatches
            );
        });
    }, [selectedFilters]);

    // Handler for filter changes
    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    return (
        <CarsContext.Provider
            value={{
                cars: filteredCars,
                brandOptions,
                models: modelOptions,
                selectedFilters,
                handleFilterChange,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};
