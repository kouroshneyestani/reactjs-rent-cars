import React, { useContext } from "react";
import { CarsContext } from "../context/CarsContext";
import { SpaceBar, Container, Filters, Card1 as Card } from "../components";

const Cars = () => {
    const { cars, brandOptions, models, selectedFilters, handleFilterChange } =
        useContext(CarsContext);

    // Define filters
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cars.map((car) => (
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
