import React, { useState, useEffect } from "react";
import { cars, carBrands } from "../data";
import { SpaceBar, Container, Filters, Card1 as Card } from "../components";

const Cars = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [models, setModels] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);

    useEffect(() => {
        setBrandOptions(
            carBrands.map((brand) => ({
                value: brand.name,
                label: `${brand.secondaryName} (${brand.name})`,
            }))
        );
    }, []);

    useEffect(() => {
        const selectedBrands = selectedFilters.brand || [];

        const allModels = selectedBrands.flatMap((brandName) => {
            const brand = carBrands.find((b) => b.name === brandName);
            return brand
                ? brand.models.map((model) => ({
                      value: model.name,
                      label: `${brand.secondaryName} - ${model.name}`,
                  }))
                : [];
        });

        const uniqueModels = Array.from(
            new Set(allModels.map((model) => model.value))
        ).map((value) => allModels.find((model) => model.value === value));

        setModels(uniqueModels);
    }, [selectedFilters.brand]);

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

    const filteredCars = cars.filter(isCarMatchingFilters);

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
            options: [2023, 2022, 2021, 2020].map((year) => ({
                value: year,
                label: year.toString(),
            })),
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
        <div>
            <SpaceBar pt={null} />
            <Container>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-2/6 w-full select-none">
                        <Filters
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                            selectedFilters={selectedFilters}
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
    );
};

export default Cars;
