import React, { useState, useEffect } from "react";
import { cars, carBrands } from "../data";
import { SpaceBar, Container, Filters, Card1 as Card } from "../components";

const Cars = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [models, setModels] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);

    // Initialize brand options based on carBrands data
    useEffect(() => {
        const brands = carBrands.map((brand) => ({
            value: brand.name,
            label: `${brand.secondaryName} (${brand.name})`, // Persian and English names
        }));
        setBrandOptions(brands);
    }, []);

    // Update models options based on selected brands
    useEffect(() => {
        const selectedBrands = selectedFilters.brand || [];

        if (selectedBrands.length > 0) {
            // Flatten models from selected brands
            const allModels = selectedBrands.flatMap((brandName) => {
                const brand = carBrands.find((b) => b.name === brandName);
                return brand
                    ? brand.models.map((model) => ({
                          value: model.name,
                          label: `${brand.secondaryName} - ${model.name}`, // Persian and English names
                      }))
                    : [];
            });

            // Remove duplicates
            const uniqueModels = Array.from(
                new Set(allModels.map((model) => model.value))
            ).map((value) => allModels.find((model) => model.value === value));
            setModels(uniqueModels);
        } else {
            setModels([]);
        }
    }, [selectedFilters.brand]);

    const handleFilterChange = (name, value, checked) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (name === "brand" || name === "model") {
                if (!newFilters[name]) newFilters[name] = [];
                if (checked) {
                    newFilters[name] = [...newFilters[name], value];
                } else {
                    newFilters[name] = newFilters[name].filter(
                        (item) => item !== value
                    );
                }
            } else {
                newFilters[name] = value;
            }
            return newFilters;
        });
    };

    const filteredCars = cars.filter((car) => {
        if (selectedFilters.city && car.location.city !== selectedFilters.city)
            return false;
        if (
            selectedFilters.state &&
            car.location.state !== selectedFilters.state
        )
            return false;
        if (
            selectedFilters.brand &&
            !selectedFilters.brand.includes(car.details.brand)
        )
            return false;
        if (
            selectedFilters.model &&
            !selectedFilters.model.includes(car.details.model)
        )
            return false;
        if (selectedFilters.year && car.details.year !== selectedFilters.year)
            return false;
        if (
            selectedFilters.transmission &&
            !selectedFilters.transmission.includes(car.details.transmission)
        )
            return false;
        if (
            selectedFilters.vehicleType &&
            !selectedFilters.vehicleType.includes(car.details.type)
        )
            return false;

        return true;
    });

    const filters = [
        {
            type: "checkbox",
            name: "brand",
            label: "برند ",
            options: brandOptions,
        },
        {
            type: "checkbox",
            name: "model",
            label: "مدل ",
            options: models,
        },
        {
            type: "checkbox",
            name: "year",
            label: "سال تولید ",
            options: [
                { value: 2023, label: "2023" },
                { value: 2022, label: "2022" },
                { value: 2021, label: "2021" },
                { value: 2020, label: "2020" },
            ],
        },
        {
            type: "checkbox",
            name: "vehicleType",
            label: "نوع خودرو ",
            options: [
                { value: "luxury", label: "لاکچری (Luxury)" },
                { value: "suv", label: "اس یو وی (SUV)" },
                { value: "economy", label: "اکونومی (Economy)" },
            ],
        },
        {
            type: "checkbox",
            name: "transmission",
            label: "نوع گیربکس",
            options: [
                { value: "auto", label: "اتوماتیک (Automatic)" },
                { value: "manual", label: "دستی (Manual)" },
            ],
        },
    ];

    return (
        <>
            <div>
                <SpaceBar pt={null} />
                <Container>
                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="md:w-2/6 w-full select-none">
                            <Filters
                                filters={filters}
                                handleFilterChange={handleFilterChange}
                                selectedFilters={selectedFilters} // Pass selectedFilters to Filters
                            />
                        </aside>

                        <main className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {filteredCars.map((car) => (
                                    <Card {...car} key={car.id} />
                                ))}
                            </div>
                        </main>
                    </div>
                </Container>
                <SpaceBar pt={null} />
            </div>
        </>
    );
};

export default Cars;
