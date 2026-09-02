const shirtPrice = 15;
const giftWrapPrice = 2;

// Create and export a function named calculateTotal.
// Input: It should accept the orderData object (the one from your handler) as a parameter.
export const calculateTotal = (orderData) => {
    const { quantity, giftWrap } = orderData;
    let total = quantity * shirtPrice;
    if (giftWrap) {
        total += giftWrapPrice;
    }
    // Return an object containing the key totalPrice (e.g., { totalPrice: 47 }).
    return { totalPrice: total };
};