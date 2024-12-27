import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const SignUP = () => {

  const [formData, setFormData] = React.useState({
    uname: '',
    uemail: '',
    upassword: '',
    phoneno: ''
  });

  const [Message, SetMessage] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(false); // Reset success state

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(true); // Set success state on successful signup
        console.log(result)
        SetMessage('Signup Successful')

        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify(result));

        // Redirect to /home
        navigate('/home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
        SetMessage("Signup Failed")
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred while signing up.');
      SetMessage("Signup Failed");
    }
  };

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input 
              type="text" 
              className="input" 
              placeholder="Full Name" 
              name="uname"
              onChange={handleChange} 
            />
            <input 
              type="email" 
              className="input" 
              placeholder="Email"
              name="uemail" 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              className="input" 
              placeholder="Phone Number" 
              name="phoneno"
              onChange={handleChange} 
            />
            <input 
              type="password" 
              className="input" 
              placeholder="Password" 
              name="upassword"
              onChange={handleChange} 
            />
          </div>
          <button type="submit">Sign up</button> {/*BUTTON IS HERE*/}
        </form>
        {Message && <div className="feedback-message">{Message}</div>}
        <div className="form-section">
          <p>
            Have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-box {
  max-width: 300px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

/*Form text*/
.title {
  font-weight: bold;
  font-size: 1.6rem;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

/*Inputs box*/
.form-container {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 .5rem;
  width: 100%;
}

.input {
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: .9rem;
  padding: 8px 15px;
}

.form-section {
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.form-section a {
  font-weight: bold;
  color:rgb(255, 255, 255);
  transition: color .3s ease;
}

.form-section a:hover {
  color:rgb(255, 255, 255);
  text-decoration: underline;
}

/*Button*/
.form button {
  background-color: Blue;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease;
}

.form button:hover {
  background-color:rgb(255, 255, 255);
}

.feedback-message {
  margin-top: 10px;
  font-size: 1rem;
  color: green; /* Default to green for success */
}

.feedback-message.error {
  color: red; /* Use red for error messages */
}

`;

export default SignUP;
