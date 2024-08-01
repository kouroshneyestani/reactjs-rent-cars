import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../slices/carSlice";
import { useMemo } from "react";

const useFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.cars.filters);
    const cars = useSelector((state) => state.cars.list);

    const setFilter = (newFilters) => {
        dispatch(setFilters(newFilters));
    };

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

        return cars.filter((car) => {
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
    };

    const filteredCars = useMemo(() => filterCars(filters), [filters, cars]);

    return { filters, setFilter, filteredCars };
};

export default useFilters;
