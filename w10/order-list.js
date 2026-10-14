// order-list.js top of file
let moduleCallbacks = {};

const orderTableBody = document.getElementById('order-table-body');

const tableBody = document.getElementById('order-table-body');

tableBody.addEventListener('click', function(event) {
    const target = event.target;
    
    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button, 
    // there will be no ID. So we stop the function immediately.
    if (!id) return;
    // if statement for checking if the target has the class 'delete-btn'
    // if true, call moduleCallbacks.onDelete and pass the ID
    if (target.classList.contains('delete-btn')) {
        moduleCallbacks.onDelete(id);
    }
    // if statement for checking if the target has the class 'edit-btn'
    // if true, call moduleCallbacks.onEdit and pass the ID
    if (target.classList.contains('edit-btn')) {
        moduleCallbacks.onEdit(id);
    }
});

// Use classes edit-btn and delete-btn. Use data-id="${order.id}".
export const renderOrders = function(orders, callbacks) {
    moduleCallbacks = callbacks;
    orderTableBody.innerHTML = '';
    for (const order of orders) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(order.timestamp).toLocaleString()}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;
        orderTableBody.appendChild(row);
    }
};