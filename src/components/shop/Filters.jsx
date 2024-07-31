import React from "react";
import { Accordion } from "../index";

const Filters = ({ filters, handleFilterChange }) => {
    return (
        <div className="md:sticky md:top-6 rounded-default border border-overlay">
            <ul className="flex flex-col">
                {filters.map((filter, index) => (
                    <li key={`filter-input-${index}`}>
                        <Accordion
                            title={filter.label}
                            className="border-b py-4 pl-4 pr-5"
                        >
                            {filter.type === "select" ? (
                                <select
                                    name={filter.name}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            filter.name,
                                            e.target.value
                                        )
                                    }
                                    className="w-full form-select mb-2 outline-none border border-overlay px-2 py-2 rounded-default"
                                >
                                    <option value="">همه {filter.label}ها</option>
                                    {filter.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                filter.type === "checkbox" && (
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
                                                    onChange={(e) =>
                                                        handleFilterChange(
                                                            filter.name,
                                                            option.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="w-full form-checkbox"
                                                />
                                                <span className="ml-2">
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )
                            )}
                        </Accordion>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filters;
