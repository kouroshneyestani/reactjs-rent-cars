// localStorageUtils.js

/**
 * Save data to local storage under a given key.
 * @param {string} key - The key under which to save the data.
 * @param {*} data - The data to save. Will be stringified if it's an object.
 */
export const saveToLocalStorage = (key, data) => {
    try {
        const value = typeof data === "object" ? JSON.stringify(data) : data;
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(
            `Error saving to localStorage under key "${key}":`,
            error
        );
    }
};

/**
 * Retrieve data from local storage by key.
 * @param {string} key - The key under which to retrieve the data.
 * @param {*} defaultValue - The default value to return if the key does not exist.
 * @returns {*} - The retrieved data, or the default value if the key does not exist.
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error(
            `Error retrieving from localStorage under key "${key}":`,
            error
        );
        return defaultValue;
    }
};

/**
 * Remove data from local storage by key.
 * @param {string} key - The key under which to remove the data.
 */
export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(
            `Error removing from localStorage under key "${key}":`,
            error
        );
    }
};

/**
 * Clear all data from local storage.
 */
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
};
