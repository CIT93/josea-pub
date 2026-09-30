console.log('Hello from app.js! Your JavaScript is connected and running!');
import { getOrderInputs } from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as orderStorage from "./order-storage.js";
import * as orderList from "./order-list.js";

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
    orderList.renderOrders(orders);
};

const clearOrders = function() {
    orders.length = 0;
    // call the clearData function from order-storage.js to remove the data from local storage
    orderStorage.clearData();
    orderList.renderOrders(orders);
    console.log('All orders cleared from local storage and UI');
};

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', clearOrders);

const init = function() {
    orderForm.addEventListener('submit', handleOrderSubmit);
    const loadedOrders = orderStorage.loadOrders();
    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        orderList.renderOrders(orders);
    }
    console.log('Loaded orders from local storage');
    console.log('App Initialized');
};

document.addEventListener('DOMContentLoaded', init);