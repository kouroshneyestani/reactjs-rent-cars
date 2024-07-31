import { useState, useEffect } from "react";
import { carBrands } from "../data";

const useCarFilters = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [brandOptions, setBrandOptions] = useState([]);
    const [models, setModels] = useState([]);

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
            const filterType = filters.find(
                (filter) => filter.name === name
            ).type;
            if (filterType === "checkbox") {
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

    return {
        selectedFilters,
        brandOptions,
        models,
        handleFilterChange,
    };
};

export default useCarFilters;
