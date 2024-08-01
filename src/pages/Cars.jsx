import React from "react";
import { useDispatch } from "react-redux";
import { SpaceBar, Container, Card1 as Card, Sidebar } from "../components";
import { clearFilters } from "../slices/carSlice";
import useFilters from "../hooks/useFilters";

const Cars = () => {
    const dispatch = useDispatch();
    const { filteredCars, setFilter } = useFilters();

    const handleFilterChange = (newFilters) => {
        setFilter(newFilters);
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    return (
        <div>
            <SpaceBar pt={null} />
            <Container>
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar onFilter={handleFilterChange} />
                    <main className="w-full">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                Available Cars
                            </h2>
                            <button
                                onClick={handleClearFilters}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Clear Filters
                            </button>
                        </div>
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
