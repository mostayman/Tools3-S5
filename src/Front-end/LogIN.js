import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    uemail: '',
    upassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Save the token and user data to localStorage
        console.log(result)
        localStorage.setItem('token', result.token); // NULL
        localStorage.setItem('name', JSON.stringify(result.uname));
        localStorage.setItem('id', JSON.stringify(result.uid));
        localStorage.setItem('email', JSON.stringify(result.uemail));
        localStorage.setItem('phoneno', JSON.stringify(result.phoneno));
  
        // Redirect to the home page on successful login
        navigate('/home');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };
  
  

  return (
    <StyledWrapper>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Log in</span>
          <span className="subtitle">
            Log into your account with your email.
          </span>
          <div className="input-group">
            <input 
              type="text"
              name="uemail" 
              id="email" 
              placeholder="Email"
              value={formData.uemail}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="upassword"
              id="password"
              placeholder="Password"
              value={formData.upassword}
              onChange={handleChange}
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button type="submit" className="sign">Log in</button>
        </form>
        <p>{error}</p>
        <p className="signup pt-4">
          Don&apos;t have an account?
          <a rel="noopener noreferrer" href="/signup" className="text-black">
            Sign up
          </a>
        </p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
.form-container {
  width: 300px;
  background:rgb(255, 255, 255);
  overflow: hidden;
  border-radius: 16px;
  color:rgb(0, 0, 0);
}

.title {
  font-weight: bold;
  font-size: 1.6rem;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

.input-group {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 .5rem;
  width: 100%;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: .9rem;
  padding: 8px 15px;
}

.input-group input:focus {
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175,1);
  margin: 8px 0 14px 0;
}

.forgot a,.signup a {
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
}

.sign {
  background-color: green;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease;
}

.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgb(121, 49, 49);
}

.signup a {
  font-weight: bold;
  color: #0066ff;
  transition: color .3s ease;
}

.signup a:hover {
  color: #005ce6;
  text-decoration: underline;
}

.signup {
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.forgot{
  color: #005ce6;
  text-decoration: underline;
}

.forgot a{
  color: #005ce6;
  text-decoration: underline;
}

`;

export default Login;
