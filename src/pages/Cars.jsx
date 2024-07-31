import { cars } from "../data";
import { Container, Card1 as Card } from "../components";

function Cars() {
    return (
        <>
            <div>
                <Container>
                    <div className="flex flex-col md:flex-row gap-8 pt-8">
                        <aside className="md:w-1/4 w-full">
                            <div className="md:sticky md:top-6 p-6 bg-gray-800"></div>
                        </aside>

                        <main className="md:w-3/4 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {cars.map((car) => (
                                    <Card {...car} key={car.id} />
                                ))}
                            </div>
                        </main>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Cars;
