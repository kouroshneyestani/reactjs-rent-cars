import React, { useState, useEffect } from "react";
import {
    saveToLocalStorage,
    getFromLocalStorage,
} from "../../utils/localStorageUtils";

const FAVORITES_KEY = "favorites";

const HeartButton = ({ itemId, className }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const favorites = getFromLocalStorage(FAVORITES_KEY, []);
        setIsFavorited(favorites.includes(itemId));
    }, [itemId]);

    const handleClick = () => {
        const favorites = getFromLocalStorage(FAVORITES_KEY, []);

        if (isFavorited) {
            const updatedFavorites = favorites.filter((id) => id !== itemId);
            saveToLocalStorage(FAVORITES_KEY, updatedFavorites);
        } else {
            const updatedFavorites = [...favorites, itemId];
            saveToLocalStorage(FAVORITES_KEY, updatedFavorites);
        }

        setIsFavorited(!isFavorited);
    };

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full transition-all duration-300 ${className} ${
                isFavorited ? "text-red-500" : "text-white"
            } hover:text-red-400`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6"
            >
                {isFavorited ? (
                    <path
                        fill="red"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                ) : (
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                )}
            </svg>
        </button>
    );
};

export default HeartButton;
