const orderTableBody = document.getElementById('order-table-body');

// Use classes edit-btn and delete-btn. Use data-id="${order.id}".
export const renderOrders = function(orders) {
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