console.log('Hello from app.js! Your JavaScript is connected and running!');
import { getOrderInputs } from "./order-handler.js";

const orderForm = document.getElementById('order-form');
const orderSummary = document.getElementById('order-summary');

const handleOrderSubmit = function(event) {
    event.preventDefault();

    const { qty, size, giftWrap } = getOrderInputs();
    const itemPrice = 15;
    const giftWrapPrice = 5;
    const totalCost = qty * itemPrice + (giftWrap ? qty * giftWrapPrice : 0);

    orderSummary.innerHTML = `
        <p>Order Details:</p>
        <p>Quantity: ${qty}</p>
        <p>Size: ${size}</p>
        <p>Gift Wrap: ${giftWrap ? 'Yes' : 'No'}</p>
        <p>Total Cost: $${totalCost}</p>
    `;
};

const init = function() {
    orderForm.addEventListener('submit', handleOrderSubmit);
    console.log('App Initialized');
};

document.addEventListener('DOMContentLoaded', init);