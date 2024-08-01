import React from "react";
import { cars } from "../data";
import { SpaceBar, Container, Card1 as Card } from "../components";

const Cars = () => {
    return (
        <div>
            <SpaceBar pt={null} />
            <Container>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-2/6 w-full select-none"></aside>

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
