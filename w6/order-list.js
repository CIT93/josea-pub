const orderTableBody = document.getElementById('order-table-body');

export const renderOrders = function(orders) {
    orderTableBody.innerHTML = '';
    for (const order of orders) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(order.timestamp).toLocaleString()}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
        `;
        orderTableBody.appendChild(row);
    }
};