import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SpaceBar, Container, Card1 as Card, Sidebar } from "../components";

const Cars = () => {
    const cars = useSelector((state) => state.cars.list);
    const [filteredCars, setFilteredCars] = useState(cars);

    // Function to filter cars based on selected criteria
    const filterCars = (filters) => {
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
            models,
        } = filters;

        const [minPrice, maxPrice] = priceRange.split("-").map(Number);

        const filtered = cars.filter((car) => {
            const priceMatch =
                (!pricePerDay || car.price.pricePerDay <= pricePerDay) &&
                (!priceRange ||
                    (car.price.pricePerDay >= minPrice &&
                        car.price.pricePerDay <= maxPrice));
            const locationMatch =
                (!state || car.location.state === state) &&
                (!city || car.location.city === city);
            const yearMatch = !year.length || year.includes(car.details.year);
            const fuelTypeMatch =
                !fuelType || car.details.fuelType === fuelType;
            const transmissionMatch =
                !transmission || car.details.transmission === transmission;
            const capacityMatch =
                !capacity || car.details.capacity === capacity;
            const colorMatch =
                !color.length || color.includes(car.details.color);
            const featuresMatch =
                !features.length ||
                features.every((f) => car.details.features.includes(f));
            const modelMatch =
                !models.length || models.includes(car.details.model);
            const brandMatch =
                !brands.length || brands.includes(car.details.brand);

            return (
                priceMatch &&
                locationMatch &&
                yearMatch &&
                fuelTypeMatch &&
                transmissionMatch &&
                capacityMatch &&
                colorMatch &&
                featuresMatch &&
                modelMatch &&
                brandMatch
            );
        });

        setFilteredCars(filtered);
    };

    return (
        <div>
            <SpaceBar pt={null} />
            <Container>
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar onFilter={filterCars} cars={cars} />{" "}
                    {/* Add Sidebar component */}
                    <main className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
