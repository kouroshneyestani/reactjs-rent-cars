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
            label: brand.secondaryName,
        }));
        setBrandOptions(brands);
    }, []);

    // Update models options based on selected brand
    useEffect(() => {
        const selectedBrand = carBrands.find(
            (brand) => brand.name === selectedFilters.brand
        );
        if (selectedBrand) {
            const brandModels = selectedBrand.models.map((model) => ({
                value: model.name,
                label: model.secondaryName,
            }));
            setModels(brandModels);
        } else {
            setModels([]);
        }
    }, [selectedFilters.brand]);

    const handleFilterChange = (name, value, checked) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (
                filters.find((filter) => filter.name === name).type ===
                "checkbox"
            ) {
                if (!newFilters[name]) newFilters[name] = [];
                if (checked) {
                    newFilters[name].push(value);
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
            car.details.brand !== selectedFilters.brand
        )
            return false;
        if (
            selectedFilters.model &&
            car.details.model !== selectedFilters.model
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
            type: "select",
            name: "city",
            label: "شهر",
            options: [
                { value: "تهران", label: "تهران" },
                // Add more city options
            ],
        },
        {
            type: "select",
            name: "state",
            label: "استان",
            options: [
                { value: "تهران", label: "تهران" },
                // Add more state options
            ],
        },
        {
            type: "select",
            name: "brand",
            label: "برند",
            options: brandOptions,
        },
        {
            type: "select",
            name: "model",
            label: "مدل",
            options: models,
        },
        {
            type: "select",
            name: "year",
            label: "سال",
            options: [
                { value: 2023, label: "2023" },
                // Add more year options
            ],
        },
        {
            type: "checkbox",
            name: "transmission",
            label: "نوع گیربکس",
            options: [
                { value: "auto", label: "اتوماتیک" },
                { value: "manual", label: "دستی" },
            ],
        },
        {
            type: "checkbox",
            name: "vehicleType",
            label: "نوع خودرو",
            options: [
                { value: "luxury", label: "Luxury" },
                { value: "suv", label: "SUV" },
                { value: "economy", label: "Economy" },
                // Add more vehicle types
            ],
        },
    ];

    return (
        <>
            <div>
                <SpaceBar pt={null} />
                <Container>
                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="md:w-1/4 w-full select-none">
                            <Filters
                                filters={filters}
                                handleFilterChange={handleFilterChange}
                            />
                        </aside>

                        <main className="md:w-3/4 w-full">
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
