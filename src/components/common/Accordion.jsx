import React, { useState } from 'react';

const Accordion = ({ title, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className={`rounded-default ${className}`}>
            <button
                onClick={toggleAccordion}
                className={`flex items-center justify-between w-full text-left transition-all duration-300`}
            >
                <span>{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M6 9l6 6 6-6"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="p-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
