import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './auth.css';
import logo from '../../public/greencart.png'; 

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
        const response = await axios.post("https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/auth/login", {
                email: email,
                passwordHash: password 
            });
        const user = response.data;

        
        if (user.role && user.role.id === 0) { 
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            navigate('/dashboard'); 
            
        } else {
            setError("Access Denied: You do not have Admin permissions.");
        }

    } catch (err) {
        console.error(err);
        setError("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <div className="auth-header">
          <img src={logo} alt="Fastkart" className="auth-logo" />
          <h3>Log In</h3>
          <p>Welcome back! Log in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          
          {error && <div className="error-message" style={{color:'red', marginBottom:'10px', textAlign:'center'}}>{error}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@greencart.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">Log In</button>

        </form>
      </div>
    </div>
  )
}

export default Auth;