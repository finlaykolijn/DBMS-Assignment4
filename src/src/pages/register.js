import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Express route to handle user registration
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const handleRegister = async () => {
    // Perform the registration logic here, e.g., make a request to your backend API
    // Use fetch or axios to send a POST request to your registration endpoint
    try {
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        const { fullName } = userData;
        setUserName(fullName);
        // Handle successful registration, e.g., redirect to login page
        alert('Registration successful');
        navigate('/userPage', { state: { userName } });
      } else {
        // Handle registration failure, e.g., show an error message
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
