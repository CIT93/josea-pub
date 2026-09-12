const displayOrderSection = document.getElementById('order-summary');
const displayTotal = document.getElementById('display-total');
const displayQty = document.getElementById('display-qty');
const displaySize = document.getElementById('display-size');
const displayGift = document.getElementById('display-gift');

export function displayOrder(order) {
    // Update the textContent of the spans using data from the object (order.totalPrice, order.qty, etc.).
    displayTotal.textContent = order.totalPrice.toFixed(2);
    displayQty.textContent = order.qty;
    displaySize.textContent = order.size;
    displayGift.textContent = order.giftWrap ? 'Yes' : 'No';
    displayOrderSection.style.display = 'block';
}