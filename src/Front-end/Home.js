import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  const Name = localStorage.getItem('name');
  const ID = localStorage.getItem('id');
  const Email = localStorage.getItem('email');
  const Phone = localStorage.getItem('phoneno');


  const goToOrders = () => {
    navigate("/order");
  };

  const goToCourier = () => {
    navigate("/courier");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <StyledWrapper>
      <h1>Welcome, {Name || "User"}!</h1>
      <p>Your email: {Email || "Not provided"}</p>
      <p>Your phone number: {Phone || "Not provided"}</p>
      <p>ID: {ID || "Not provided"}</p>
      <button
        className="btn" 
        onClick={goToOrders}
      >Orders</button>
      <button
        className="btn" 
        onClick={goToCourier}
      >Courier</button>
      <button
        className="btn" 
        onClick={goToAdmin}
      >Admin</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
.btn {
   --color: #A63F8A;
   margin-right: 12px;
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

  text-align: center;
  margin-top: 20px;
  color: white;
`;

export default Home;
