import React, { useContext } from "react";
import { Accordion } from "../index";

const Filters = ({ filters, handleFilterChange, selectedFilters }) => {

    // Determine if any brands are selected to conditionally display models
    const isBrandSelected =
        Array.isArray(selectedFilters.brand) &&
        selectedFilters.brand.length > 0;

    // Check if filters data is available before rendering
    if (!filters || filters.length === 0) {
        return <div>No filters available</div>;
    }

    // Render the Filters component with filter accordions
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
                                            {models.length > 0 ? (
                                                models.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className="w-full flex items-center mb-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name={filter.name}
                                                            value={option.value}
                                                            checked={
                                                                (Array.isArray(
                                                                    selectedFilters.model
                                                                ) &&
                                                                    selectedFilters.model.includes(
                                                                        option.value
                                                                    )) ||
                                                                false
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
                                                (Array.isArray(
                                                    selectedFilters[filter.name]
                                                ) &&
                                                    selectedFilters[
                                                        filter.name
                                                    ].includes(option.value)) ||
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
                                ))
                            )}
                        </Accordion>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filters;
