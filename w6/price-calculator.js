const shirtPrice = 15;
const giftWrapPrice = 2;


export const calculateTotal = function(orderData) {
    const { qty, giftWrap } = orderData;
    let total = qty * shirtPrice;
    if (giftWrap) {
        total += giftWrapPrice;
    }

    return { totalPrice: total };
};