import React, { useState, useEffect } from "react";
import { carBrands } from "../../data";

const Sidebar = ({ onFilter, cars }) => {
    const [priceRange, setPriceRange] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [year, setYear] = useState([]);
    const [fuelType, setFuelType] = useState("");
    const [transmission, setTransmission] = useState("");
    const [capacity, setCapacity] = useState("");
    const [color, setColor] = useState([]);
    const [features, setFeatures] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrandModels, setSelectedBrandModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);

    // Create options for states and cities
    const states = [...new Set(cars.map((car) => car.location.state))];
    const cities = [...new Set(cars.map((car) => car.location.city))];
    const years = [...new Set(cars.map((car) => car.details.year))].sort(
        (a, b) => a - b
    );
    const fuelTypes = [...new Set(cars.map((car) => car.details.fuelType))];
    const transmissions = [
        ...new Set(cars.map((car) => car.details.transmission)),
    ];
    const capacities = [...new Set(cars.map((car) => car.details.capacity))];
    const colors = [...new Set(cars.map((car) => car.details.color))];
    const allFeatures = [
        ...new Set(cars.flatMap((car) => car.details.features)),
    ];
    const brandNames = carBrands.map((brand) => brand.name);

    // Update selectedBrandModels based on selected brands
    useEffect(() => {
        const models = carBrands
            .filter((brand) => brands.includes(brand.name))
            .flatMap((brand) =>
                brand.models.map((model) => ({ brand: brand.name, ...model }))
            );

        setSelectedBrandModels(models);
    }, [brands]);

    // Handle changes in the filter inputs
    const handleFilterChange = () => {
        onFilter({
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
            models: selectedModels,
        });
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
                    <div key={brand} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`brand-${brand}`}
                            value={brand}
                            checked={brands.includes(brand)}
                            onChange={(e) => {
                                const newBrands = e.target.checked
                                    ? [...brands, brand]
                                    : brands.filter((val) => val !== brand);
                                setBrands(newBrands);
                            }}
                            className="mr-2"
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm">
                            {brand}
                        </label>
                    </div>
                ))}
            </div>

            {/* Model Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Models
                </label>
                {brands.length === 0 ? (
                    <p className="text-gray-500">Please choose brand first</p>
                ) : (
                    selectedBrandModels.map((model) => (
                        <div
                            key={model.name}
                            className="flex items-center mb-2"
                        >
                            <input
                                type="checkbox"
                                id={`model-${model.name}`}
                                value={model.name}
                                checked={selectedModels.includes(model.name)}
                                onChange={(e) => {
                                    const newModels = e.target.checked
                                        ? [...selectedModels, model.name]
                                        : selectedModels.filter(
                                              (val) => val !== model.name
                                          );
                                    setSelectedModels(newModels);
                                }}
                                className="mr-2"
                            />
                            <label
                                htmlFor={`model-${model.name}`}
                                className="text-sm"
                            >
                                {model.name}
                            </label>
                        </div>
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
                    onChange={(e) => setPriceRange(e.target.value)}
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
                    onChange={(e) => setPricePerDay(e.target.value)}
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
                    onChange={(e) => setState(e.target.value)}
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
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select City</option>
                        {cities
                            .filter((c) => c.state === state)
                            .map((c) => (
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
                    <div key={y} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`year-${y}`}
                            value={y}
                            checked={year.includes(y)}
                            onChange={(e) => {
                                const newYears = e.target.checked
                                    ? [...year, y]
                                    : year.filter((val) => val !== y);
                                setYear(newYears);
                            }}
                            className="mr-2"
                        />
                        <label htmlFor={`year-${y}`} className="text-sm">
                            {y}
                        </label>
                    </div>
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
                    onChange={(e) => setFuelType(e.target.value)}
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
                    onChange={(e) => setTransmission(e.target.value)}
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
                    onChange={(e) => setCapacity(e.target.value)}
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
                    <div key={c} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`color-${c}`}
                            value={c}
                            checked={color.includes(c)}
                            onChange={(e) => {
                                const newColors = e.target.checked
                                    ? [...color, c]
                                    : color.filter((val) => val !== c);
                                setColor(newColors);
                            }}
                            className="mr-2"
                        />
                        <label htmlFor={`color-${c}`} className="text-sm">
                            {c}
                        </label>
                    </div>
                ))}
            </div>

            {/* Features Filter */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Features
                </label>
                {allFeatures.map((f) => (
                    <div key={f} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`feature-${f}`}
                            value={f}
                            checked={features.includes(f)}
                            onChange={(e) => {
                                const newFeatures = e.target.checked
                                    ? [...features, f]
                                    : features.filter((val) => val !== f);
                                setFeatures(newFeatures);
                            }}
                            className="mr-2"
                        />
                        <label htmlFor={`feature-${f}`} className="text-sm">
                            {f}
                        </label>
                    </div>
                ))}
            </div>

            {/* Apply Filters Button */}
            <button
                onClick={handleFilterChange}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Apply Filters
            </button>
        </aside>
    );
};

export default Sidebar;