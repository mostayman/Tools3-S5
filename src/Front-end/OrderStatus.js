import React, { useState } from 'react';
import styled from 'styled-components';

const UpdateOrderStatusPage = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('picked up');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API call to update the order status
    const response = await fetch('http://localhost:5000/api/update-order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });

    if (response.ok) {
      alert('Order status updated successfully!');
    } else {
      alert('Failed to update order status');
    }
  };

  return (
    <StyledWrapper>
      <h1>Update Order Status</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="picked up">Picked Up</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="declined">Declined</option>
          </select>
        </label>
        <button type="submit">Update Status</button>
      </form>
    </StyledWrapper>
  );
};

export default UpdateOrderStatusPage;

const StyledWrapper = styled.div`
  padding: 20px;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  label {
    display: flex;
    flex-direction: column;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #5891ff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #3a70cc;
  }
`;
