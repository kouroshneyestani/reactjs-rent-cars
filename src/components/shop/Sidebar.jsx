// src/components/Sidebar.jsx

import React, { useEffect, useState } from "react";
import { carBrands } from "../../data";
import useFilters from "../../hooks/useFilters";

const FilterCheckbox = ({ label, value, checked, onChange }) => (
    <div className="flex items-center mb-2">
        <input
            type="checkbox"
            id={label}
            value={value}
            checked={checked}
            onChange={onChange}
            className="mr-2"
        />
        <label htmlFor={label} className="text-sm">
            {label}
        </label>
    </div>
);

const Sidebar = () => {
    const { filters, setFilter, filteredCars } = useFilters();
    const [selectedBrandModels, setSelectedBrandModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);

    const {
        priceRange,
        pricePerDay,
        state,
        city,
        year,
        fuelType,
        transmission,
        capacity,
        color,
        features,
        brands,
    } = filters;

    // Compute unique values based on filtered cars
    const states = [...new Set(filteredCars.map((car) => car.location.state))];
    const cities = [
        ...new Set(
            filteredCars
                .filter((car) => car.location.state === state)
                .map((car) => car.location.city)
        ),
    ];
    const years = [
        ...new Set(filteredCars.map((car) => car.details.year)),
    ].sort((a, b) => a - b);
    const fuelTypes = [
        ...new Set(filteredCars.map((car) => car.details.fuelType)),
    ];
    const transmissions = [
        ...new Set(filteredCars.map((car) => car.details.transmission)),
    ];
    const capacities = [
        ...new Set(filteredCars.map((car) => car.details.capacity)),
    ];
    const colors = [...new Set(filteredCars.map((car) => car.details.color))];
    const allFeatures = [
        ...new Set(filteredCars.flatMap((car) => car.details.features)),
    ];
    const brandNames = carBrands.map((brand) => brand.name);

    useEffect(() => {
        const models = carBrands
            .filter((brand) => brands.includes(brand.name))
            .flatMap((brand) =>
                brand.models.map((model) => ({ brand: brand.name, ...model }))
            );

        setSelectedBrandModels(models);
    }, [brands]);

    const handleChange = (field) => (e) => {
        setFilter({ [field]: e.target.value });
    };

    const handleCheckboxChange = (field) => (value) => (e) => {
        const newArray = e.target.checked
            ? [...filters[field], value]
            : filters[field].filter((item) => item !== value);
        setFilter({ [field]: newArray });
    };

    return (
        <aside className="md:w-2/6 w-full p-4 bg-gray-100 border-r border-gray-300">
            <h2 className="text-lg font-semibold mb-4">Filter Cars</h2>

            {/* Brand Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Brands
                </label>
                {brandNames.map((brand) => (
                    <FilterCheckbox
                        key={brand}
                        label={brand}
                        value={brand}
                        checked={brands.includes(brand)}
                        onChange={handleCheckboxChange("brands")(brand)}
                    />
                ))}
            </div>

            {/* Model Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Models
                </label>
                {brands.length === 0 ? (
                    <p className="text-gray-500">Please choose a brand first</p>
                ) : (
                    selectedBrandModels.map((model) => (
                        <FilterCheckbox
                            key={model.name}
                            label={model.name}
                            value={model.name}
                            checked={selectedModels.includes(model.name)}
                            onChange={handleCheckboxChange("models")(
                                model.name
                            )}
                        />
                    ))
                )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Price Range
                </label>
                <select
                    value={priceRange}
                    onChange={handleChange("priceRange")}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select Range</option>
                    <option value="0-10000">0 - 10,000</option>
                    <option value="10000-20000">10,000 - 20,000</option>
                </select>
            </div>

            {/* Price Per Day Filter */}
            <div className="mb-4">
                <label
                    htmlFor="pricePerDay"
                    className="block text-sm font-medium text-gray-700"
                >
                    Price Per Day
                </label>
                <input
                    id="pricePerDay"
                    type="number"
                    value={pricePerDay}
                    onChange={handleChange("pricePerDay")}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            {/* Location Filter */}
            <div className="mb-4">
                <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                >
                    State
                </label>
                <select
                    id="state"
                    value={state}
                    onChange={(e) => {
                        setFilter({ state: e.target.value, city: "" }); // Clear city selection
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select State</option>
                    {states.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>
            {state && (
                <div className="mb-4">
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                    >
                        City
                    </label>
                    <select
                        id="city"
                        value={city}
                        onChange={handleChange("city")}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select City</option>
                        {cities.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Year Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Year
                </label>
                {years.map((y) => (
                    <FilterCheckbox
                        key={y}
                        label={y}
                        value={y}
                        checked={year.includes(y)}
                        onChange={handleCheckboxChange("year")(y)}
                    />
                ))}
            </div>

            {/* Fuel Type Filter */}
            <div className="mb-4">
                <label
                    htmlFor="fuelType"
                    className="block text-sm font-medium text-gray-700"
                >
                    Fuel Type
                </label>
                <select
                    id="fuelType"
                    value={fuelType}
                    onChange={handleChange("fuelType")}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((ft) => (
                        <option key={ft} value={ft}>
                            {ft}
                        </option>
                    ))}
                </select>
            </div>

            {/* Transmission Filter */}
            <div className="mb-4">
                <label
                    htmlFor="transmission"
                    className="block text-sm font-medium text-gray-700"
                >
                    Transmission
                </label>
                <select
                    id="transmission"
                    value={transmission}
                    onChange={handleChange("transmission")}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select Transmission</option>
                    {transmissions.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            {/* Capacity Filter */}
            <div className="mb-4">
                <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700"
                >
                    Capacity
                </label>
                <select
                    id="capacity"
                    value={capacity}
                    onChange={handleChange("capacity")}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select Capacity</option>
                    {capacities.map((cap) => (
                        <option key={cap} value={cap}>
                            {cap}
                        </option>
                    ))}
                </select>
            </div>

            {/* Color Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Color
                </label>
                {colors.map((c) => (
                    <FilterCheckbox
                        key={c}
                        label={c}
                        value={c}
                        checked={color.includes(c)}
                        onChange={handleCheckboxChange("color")(c)}
                    />
                ))}
            </div>

            {/* Features Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Features
                </label>
                {allFeatures.map((f) => (
                    <FilterCheckbox
                        key={f}
                        label={f}
                        value={f}
                        checked={features.includes(f)}
                        onChange={handleCheckboxChange("features")(f)}
                    />
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
