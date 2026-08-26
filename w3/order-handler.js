const qtyInput = document.querySelector('#qty');
const giftWrapCheckbox = document.querySelector('#gift-wrap');
const sizeRadios = document.querySelectorAll('input[name="size"]');

function getSelectedSize() {
    for (const radio of sizeRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

export function getOrderInputs() {
    return {
        qty: parseInt(qtyInput.value),
        size: getSelectedSize(),
        giftWrap: giftWrapCheckbox.checked
    };
}

export const orderForm = document.getElementById('order-form');

export const orderSummary = document.getElementById('order-summary');

export function handleOrderSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const orderInputs = getOrderInputs();
    const { qty, size, giftWrap } = orderInputs;

    // Calculate the total cost
    const itemPrice = 15;
    let totalCost = qty * itemPrice;

    if (giftWrap) {
        totalCost += qty * 5; // Add $5 for each item with gift wrap
    }

    // Display the order summary
    orderSummary.textContent = `Ordered ${qty} ${size} T-Shirts${giftWrap ? ' with gift wrap' : ''}`;
    orderSummary.innerHTML = `
        <p>Order Details:</p>
        <p>Quantity: ${qty}</p>
        <p>Size: ${size}</p>
        <p>Gift Wrap: ${giftWrap ? 'Yes' : 'No'}</p>
        <p>Total Cost: $${totalCost}</p>
    `;
}

export function init() {
    orderForm.addEventListener('submit', handleOrderSubmit);
    console.log('App Initialized');
}

document.addEventListener('DOMContentLoaded', () => {

    init();
}); 