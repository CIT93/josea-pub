export const getOrderInputs = function() {
    const qtyInput = document.querySelector('#qty');
    const giftWrapCheckbox = document.querySelector('#gift-wrap');
    const sizeRadios = document.querySelectorAll('input[name="size"]');
    let selectedSize = null;

    for (const radio of sizeRadios) {
        if (radio.checked) {
            selectedSize = radio.value;
            break;
        }
    }

    return {
        qty: parseInt(qtyInput.value, 10),
        size: selectedSize,
        giftWrap: giftWrapCheckbox.checked
    };
};