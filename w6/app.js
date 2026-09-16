console.log('Hello from app.js! Your JavaScript is connected and running!');
import { getOrderInputs } from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as resultsDisplay from "./results-display.js";
import * as orderStorage from "./order-storage.js";

const orderForm = document.getElementById('order-form');

const orders = [];

const handleOrderSubmit = function(event) {
    event.preventDefault();

    const orderData = getOrderInputs();
    const priceData = priceCalculator.calculateTotal(orderData);

    const newOrder = {
        ...orderData,
        ...priceData,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    orderStorage.saveOrders(orders);
    resultsDisplay.displayOrder(newOrder);
};

const init = function() {
    orderForm.addEventListener('submit', handleOrderSubmit);
    const loadedOrders = orderStorage.loadOrders();
    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
    }
    console.log('Loaded orders from local storage');
    console.log('App Initialized');
};

document.addEventListener('DOMContentLoaded', init);