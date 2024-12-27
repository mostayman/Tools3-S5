import React, { useState } from 'react';
import styled from "styled-components";

const Order = () => {
  const [formData, setFormData] = useState({
    orderID: '',
    orderDetails: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    dropoffTime: '',
    userId: ''
  });

  // Get user info from localStorage (logged-in user data)
  const ID = localStorage.getItem('id');  // Get userId (uid) from localStorage

  // Set userId when component is mounted (for formData)
  React.useEffect(() => {
    setFormData((prevDetails) => ({
      ...prevDetails,
      userId: ID,  // Set userId from localStorage
    }));
  }, [ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to create the order
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,  // Include userId in the request
          orderDetails: formData.orderDetails,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          pickupTime: formData.pickupTime,
          dropoffTime: formData.dropoffTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully created order
        alert('Order created successfully!');
      } else {
        // Handle API error
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      // Handle network or other errors
      alert('An error occurred while submitting the order');
    }
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className='w-1/2 text-center textInputWrapper'>
            <input
              className="textInput mb-4 w-full"
              name="orderDetails"
              placeholder="Order Details"
              required
              type="text"
              value={formData.orderDetails}
              onChange={handleChange}
            />
          </div>
        <div className="form flex w-full items-center justify-center">
          <div className="textInputWrapper w-1/4">
            <input
              className="textInput mb-4"
              name="pickupLocation"
              placeholder="Pick-Up Location"
              required
              type="text"
              value={formData.pickupLocation}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="textInput"
              name="dropoffTime"
              placeholder="Drop-off Time"
              required
              type="date"
              value={formData.dropoffTime}
              onChange={handleChange}
            />
            <span className="input-border" />
          </div>
          <div className="textInputWrapper w-1/4">
            <input
              className="textInput mb-4"
              name="dropoffLocation"
              placeholder="Drop-off Location"
              required
              type="text"
              value={formData.dropoffLocation}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="textInput "
              name="pickupTime"
              placeholder="Pick-up Time"
              required
              type="date"
              value={formData.pickupTime}
              onChange={handleChange}
            />
            <span className="input-border" />
          </div>
        </div>
        <div className='flex mt-4 w-1/2 justify-between'>
          <button type="submit" className="btn">Submit Order</button>
          <a href='/orders' className='btn'>My Orders</a>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(38%) sepia(11%) saturate(3494%) hue-rotate(265deg) brightness(87%) contrast(92%);
  }

  .btn {
   --color: #A63F8A;
   padding: 0.8em 1.7em;
   background-color: transparent;
   border-radius: .3em;
   position: relative;
   overflow: hidden;
   cursor: pointer;
   transition: .5s;
   font-weight: 400;
   font-size: 17px;
   border: 1px solid;
   font-family: inherit;
   text-transform: uppercase;
   color: var(--color);
   z-index: 1;
  }

  .btn::before, .btn::after {
   content: '';
   display: block;
   width: 50px;
   height: 50px;
   transform: translate(-50%, -50%);
   position: absolute;
   border-radius: 50%;
   z-index: -1;
   background-color: var(--color);
   transition: 1s ease;
  }

  .btn::before {
   top: -1em;
   left: -1em;
  }

  .btn::after {
   left: calc(100% + 1em);
   top: calc(100% + 1em);
  }

  .btn:hover::before, .btn:hover::after {
   height: 410px;
   width: 410px;
  }

  .btn:hover {
   color: white;
  }

  .btn:active {
   filter: brightness(.8);
  }

  .textInputWrapper:before {
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  .textInputWrapper:before,
  .textInputWrapper:after {
    content: "";
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    bottom: -1px;
    z-index: 4;
    width: 100%;
  }

  .textInputWrapper:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
  }

  .textInputWrapper:before {
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  .textInputWrapper:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
    transform: scaleX(1);
  }

  .textInputWrapper:focus-within:after {
    border-bottom: 2px solid var(--accent-color);
    transform: scaleX(1);
  }

  .textInputWrapper:after {
    content: "";
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    will-change: transform;
    border-bottom: 2px solid var(--accent-color);
    border-bottom-color: var(--accent-color);
  }

  .textInput::placeholder {
    transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    opacity: 1;
    user-select: none;
    color: rgba(255, 255, 255, 0.582);
  }

  .textInputWrapper .textInput {
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 2px 5px rgb(35 35 35 / 30%);
    max-height: 36px;
    background-color: #252525;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 200ms;
    transition-property: background-color;
    color: #e8e8e8;
    font-size: 14px;
    font-weight: 500;
    padding: 12px;
    width: 100%;
    border-left: none;
    border-bottom: none;
    border-right: none;
  }

  .textInputWrapper .textInput:focus,
  .textInputWrapper .textInput:active {
    outline: none;
  }

  .textInputWrapper:focus-within .textInput,
  .textInputWrapper .textInput:focus,
  .textInputWrapper .textInput:active {
    background-color: #353535;
  }

  .textInputWrapper:focus-within .textInput::placeholder {
    opacity: 0;
  
`;

export default Order;
