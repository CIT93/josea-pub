const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export function saveOrders(orders) {
    const ordersString = JSON.stringify(orders);
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, ordersString);
    } catch (error) {
        console.error('Error saving orders to local storage:', error);
    }
};

// Export a function named loadOrders That should use localStorage.getItem to retrieve the string.
export function loadOrders() {
    const ordersString = localStorage.getItem(LOCAL_STORAGE_KEY);
    // If data exists, use JSON.parse to turn it back into an array and return it. if not, return an empty array.
    if (ordersString) {
        try {
            return JSON.parse(ordersString);
        } catch (error) {
            console.error('Error parsing orders from local storage:', error);
            return [];
        }
    } else {
        return [];
    }
};