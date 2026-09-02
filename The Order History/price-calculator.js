const shirtPrice = 15;
const giftWrapPrice = 2;


export const calculateTotal = (orderData) => {
    const { quantity, giftWrap } = orderData;
    let total = quantity * shirtPrice;
    if (giftWrap) {
        total += giftWrapPrice;
    }

    return { totalPrice: total };
};