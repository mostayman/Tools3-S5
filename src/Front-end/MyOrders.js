import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/orders/${userId}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        } else {
          setError('No orders found');
        }
      } catch (error) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (orderID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderID}`);
      const data = await response.json();
      setSelectedOrder(data);
      setIsModalOpen(true);
    } catch (error) {
      setError('Failed to fetch order details');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='text-white'>
      <div className='items-center justify-center flex pb-4'><h1>My Orders</h1></div>
      <div className='flex'>
        {orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          orders.map((order) => (
            <div className='pr-4 bg-slate-800 rounded-md mr-4' key={order.orderID}>
              <div className='p-4'>
                <h3>Order ID: {order.orderID}</h3>
                <p><strong>Details:</strong> {order.orderDetails}</p>
                <p><strong>Pickup:</strong> {order.pickupLocation}</p>
                <p><strong>Dropoff:</strong> {order.dropoffLocation}</p>
                <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
                <p><strong>Dropoff Time:</strong> {order.dropoffTime}</p>

                <button className='text-green-500' onClick={() => fetchOrderDetails(order.orderID)}>View Details</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for displaying selected order details */}
      {isModalOpen && selectedOrder && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>X</CloseButton>
              <div className='text-black'>
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> {selectedOrder.orderID}</p>
                <p><strong>Details:</strong> {selectedOrder.orderDetails}</p>
                <p><strong>Pickup Location:</strong> {selectedOrder.pickupLocation}</p>
                <p><strong>Dropoff Location:</strong> {selectedOrder.dropoffLocation}</p>
                <p><strong>Pickup Time:</strong> {selectedOrder.pickupTime}</p>
                <p><strong>Dropoff Time:</strong> {selectedOrder.dropoffTime}</p>
              </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default MyOrders;

// Modal Styling using styled-components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);  // Dark transparent background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  // Ensure the modal is on top
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #d9534f;
  }
`;

