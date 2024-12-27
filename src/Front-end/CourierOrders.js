import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AssignedOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch assigned orders from backend (example API call)
  useEffect(() => {
    // Replace with your actual API call to fetch assigned orders for the courier
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:5000/api/assigned-orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = (orderId) => {
    // Handle accepting the order (update the order status to accepted, etc.)
    console.log(`Accepted Order: ${orderId}`);
  };

  const handleDeclineOrder = (orderId) => {
    // Handle declining the order
    console.log(`Declined Order: ${orderId}`);
  };

  return (
    <StyledWrapper>
      <h1>Assigned Orders</h1>
      <div className="orders-container">
        {orders.length === 0 ? (
          <div>No assigned orders</div>
        ) : (
          orders.map((order) => (
            <div key={order.orderID} className="order-item">
              <h3>Order ID: {order.orderID}</h3>
              <p><strong>Details:</strong> {order.orderDetails}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <div className="status-indicator">
                <span className={`status ${order.status.toLowerCase()}`}></span>
              </div>
              <div className="action-buttons">
                <button onClick={() => handleAcceptOrder(order.orderID)}>Accept</button>
                <button onClick={() => handleDeclineOrder(order.orderID)}>Decline</button>
              </div>
            </div>
          ))
        )}
      </div>
    </StyledWrapper>
  );
};

export default AssignedOrdersPage;

const StyledWrapper = styled.div`
  color: white;
  padding: 20px;
  .orders-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .order-item {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
  }
  .status-indicator {
    margin-top: 10px;
  }
  .status {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .accepted {
    background-color: green;
  }
  .declined {
    background-color: red;
  }
  .in-transit {
    background-color: yellow;
  }
  .delivered {
    background-color: blue;
  }
  .action-buttons button {
    margin-right: 10px;
  }
`;
