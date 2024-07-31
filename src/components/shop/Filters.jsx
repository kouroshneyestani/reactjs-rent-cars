import React from "react";
import { Accordion } from "../index";

const Filters = ({ filters, handleFilterChange }) => {
    return (
        <div className="md:sticky md:top-6 p-6 rounded-default bg-overlay border-b-4 border-primary">
            <ul className="flex flex-col">
                {filters.map((filter, index) => (
                    <li key={`filter-input-${index}`}>
                        <Accordion title={filter.label}>
                            {filter.type === "select" ? (
                                <select
                                    name={filter.name}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            filter.name,
                                            e.target.value
                                        )
                                    }
                                    className="form-select mb-2"
                                >
                                    <option value="">انتخاب کنید</option>
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
                                                    className="form-checkbox"
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
