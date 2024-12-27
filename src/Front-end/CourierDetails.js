import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AssignedOrdersToCourierPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch assigned orders to couriers (example API call)
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:5000/api/assigned-orders-to-courier');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleReassignOrder = (orderId, newCourierId) => {
    // Handle reassignment of the order (make API call)
    console.log(`Reassigned Order ${orderId} to Courier ${newCourierId}`);
  };

  return (
    <StyledWrapper>
      <h1>Assigned Orders to Courier</h1>
      <div>
        {orders.map((order) => (
          <div key={order.orderID}>
            <h3>Order ID: {order.orderID}</h3>
            <p><strong>Courier:</strong> {order.courierName}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <button onClick={() => handleReassignOrder(order.orderID, 'newCourierId')}>
              Reassign Order
            </button>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default AssignedOrdersToCourierPage;

const StyledWrapper = styled.div`
  padding: 20px;
  div {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  button {
    padding: 5px 10px;
    background-color: #5891ff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #3a70cc;
  }
`;
