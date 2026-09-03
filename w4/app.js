console.log('Hello from app.js! Your JavaScript is connected and running!');
import { getOrderInputs } from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import { displayResults } from "./results-display.js";

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
    console.log(orders);
    displayResults(newOrder);
};

const init = function() {
    orderForm.addEventListener('submit', handleOrderSubmit);
    console.log('App Initialized');
};

document.addEventListener('DOMContentLoaded', init);