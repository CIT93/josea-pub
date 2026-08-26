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