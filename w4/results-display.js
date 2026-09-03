const resultsDisplay = document.getElementById('results-display');
const displayTotal = document.getElementById('display-total');
const displayQty = document.getElementById('display-qty');
const displaySize = document.getElementById('display-size');
const displayGift = document.getElementById('display-gift');

export const displayResults = function(orderData) {
    displayTotal.textContent = orderData.totalPrice;
    displayQty.textContent = orderData.qty;
    displaySize.textContent = orderData.size;
    displayGift.textContent = orderData.giftWrap ? 'Yes' : 'No';
    resultsDisplay.style.display = 'block';
};
