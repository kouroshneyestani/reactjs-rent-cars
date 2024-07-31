import React from "react";

const Filter = ({ filter, onChange }) => {
    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        onChange(name, value, checked);
    };

    return (
        <div className="filter">
            <label className="block text-gray-700 font-bold mb-2">
                {filter.label}
            </label>
            {filter.type === "select" && (
                <select
                    name={filter.name}
                    onChange={(e) => onChange(filter.name, e.target.value)}
                    className="form-select"
                >
                    <option value="">انتخاب کنید</option>
                    {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
            {filter.type === "checkbox" && (
                <div className="flex flex-col">
                    {filter.options.map((option) => (
                        <label key={option.value} className="flex items-center">
                            <input
                                type="checkbox"
                                name={filter.name}
                                value={option.value}
                                onChange={handleChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">{option.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const Filters = ({ filters, onChange }) => {
    return (
        <div className="filters">
            {filters.map((filter) => (
                <Filter key={filter.name} filter={filter} onChange={onChange} />
            ))}
        </div>
    );
};

export default Filters;
