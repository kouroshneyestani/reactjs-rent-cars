import React from "react";
import { Accordion } from "../index";

const Filters = ({ filters, handleFilterChange, selectedFilters }) => {
    // Find the brand filter to check if any brand is selected
    const brandFilter = filters.find((filter) => filter.name === "brand");
    const modelFilter = filters.find((filter) => filter.name === "model");

    const isBrandSelected = brandFilter?.options.some((option) =>
        selectedFilters.brand?.includes(option.value)
    );

    return (
        <div className="md:sticky md:top-6 rounded-default border border-overlay">
            <ul className="flex flex-col">
                {filters.map((filter, index) => (
                    <li key={`filter-input-${index}`}>
                        <Accordion
                            title={filter.label}
                            className="border-b py-4 pl-4 pr-5"
                        >
                            {filter.type === "checkbox" &&
                            filter.name === "model" ? (
                                <>
                                    {isBrandSelected ? (
                                        <div className="flex flex-col">
                                            {filter.options.length > 0 ? (
                                                filter.options.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className="w-full flex items-center mb-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name={filter.name}
                                                            value={option.value}
                                                            checked={
                                                                selectedFilters.model?.includes(
                                                                    option.value
                                                                ) || false
                                                            }
                                                            onChange={(e) =>
                                                                handleFilterChange(
                                                                    filter.name,
                                                                    option.value,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                            className="w-16 form-checkbox"
                                                        />
                                                        <span className="w-full flex ml-2">
                                                            {option.label}
                                                        </span>
                                                    </label>
                                                ))
                                            ) : (
                                                <p>
                                                    هیچ مدلی برای برندهای انتخاب
                                                    شده موجود نیست.
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p>
                                            لطفا ابتدا برند خودرو رو انتخاب کنید
                                        </p>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    {filter.options.map((option) => (
                                        <label
                                            key={option.value}
                                            className="flex items-center mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                name={filter.name}
                                                value={option.value}
                                                checked={
                                                    selectedFilters[
                                                        filter.name
                                                    ]?.includes(option.value) ||
                                                    false
                                                }
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        filter.name,
                                                        option.value,
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-16 form-checkbox"
                                            />
                                            <span className="w-full flex ml-2">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </Accordion>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filters;
