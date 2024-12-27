import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from backend (example API call)
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:5000/api/all-orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = (orderId, newStatus) => {
    // Handle order status update (make API call)
    console.log(`Updated Order ${orderId} to status ${newStatus}`);
  };

  const handleDeleteOrder = (orderId) => {
    // Handle order deletion (make API call)
    console.log(`Deleted Order: ${orderId}`);
  };

  return (
    <StyledWrapper>
      <h1>Manage Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Details</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderID}>
              <td>{order.orderID}</td>
              <td>{order.orderDetails}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleUpdateStatus(order.orderID, 'delivered')}>Mark as Delivered</button>
                <button onClick={() => handleDeleteOrder(order.orderID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledWrapper>
  );
};

export default ManageOrdersPage;

const StyledWrapper = styled.div`
  color: white;
  padding: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  button {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #5891ff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #3a70cc;
    cursor: pointer;
  }
`;
