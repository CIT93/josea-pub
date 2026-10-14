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

    // get the hidden id (order-id) input value
    const orderIdInput = document.getElementById('order-id');
    // if the id exists, update the object by merging it with the new orderData and total(priceData). Also use the spread operator.
    if (orderIdInput && orderIdInput.value) {
        const orderId = orderIdInput.value;
        const index = orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
            orders[index] = {
                ...orders[index],
                ...orderData,
                ...priceData
            };
        } else {
            const newOrder = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...orderData,
                ...priceData
            };
            orders.push(newOrder);
        }
    } else {
        const newOrder = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...orderData,
            ...priceData
        };
        orders.push(newOrder);
    }

    orderIdInput.value = '';
    orderForm.reset();
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
};

const handleDelete = function(id) {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
        orders.splice(index, 1);
    }
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
    console.log("App.js: Order has been deleted", id);
};

const handleEdit = function(id) {
    const orderToEdit = orders.find(order => order.id === id);
    if (!orderToEdit) return;

    const qtyInput = document.getElementById('qty');
    const sizeInput = document.querySelector('input[name="size"][value="' + orderToEdit.size + '"]');
    const giftWrapInput = document.getElementById('gift-wrap');
    const orderIdInput = document.getElementById('order-id');

    if (qtyInput) qtyInput.value = orderToEdit.qty;
    if (sizeInput) sizeInput.checked = true;
    if (giftWrapInput) giftWrapInput.checked = orderToEdit.giftWrap;
    if (orderIdInput) orderIdInput.value = orderToEdit.id;
    console.log("App.js: Now editing order", id);
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
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    }
    console.log('Loaded orders from local storage');
    console.log('App Initialized');
};

document.addEventListener('DOMContentLoaded', init);