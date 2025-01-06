// Import React functionalities
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const [searchName, setSearchName] = useState('');
    const [searchField, setSearchField] = useState('category');
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userID,setUserID] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login-user', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (response.ok) {
                const userData = await response.json();
                const { userID, userFullName } = userData;
                setUserID(userID);
                setUserName(userFullName);
                alert('Login successful');
                navigate('/userPage', { state: { userName: userFullName } });
            } else {
                alert('Login failed');
            }
        } catch (error) {
            alert(`Error during login: ${error}`);
        }
    };

    const handleProductSearch = async () => {
        try {
            const response = await fetch(`/api/cheapest-product/${searchName}/${searchField}`);

            const data = await response.json();

            if (response.ok) {
                setData(data)
            } else {
                // Handle errors, for now, log the error to the console
                alert(`Response not ok: ${response.error}`);
            }
        } catch (error) {
            alert(`Error during replacement: ${error.message}`);
        }
    }


    return (

        <div className="App">
            <div>
                <h2>Login</h2>
                <form>
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
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
            </div>

            <h3>Find Cheapest Products for a Specific Field</h3>
            <div>
                <label htmlFor="requestField">Search Field:</label>
                <select
                    id="requestField"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                >
                    <option value="category">Category</option>
                    <option value="productName">Product Name</option>
                    <option value="availableAt">Store Name</option>
                </select>
                <label>Enter Product Name:</label>
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
            </div>
            <button onClick={handleProductSearch}>Fetch Data</button>
            <ul>
                {data.map(item => (
                    <li key={item.productID}>ID: {item.productID}, Name: {item.productName}, Category: {item.category}, Store: {item.availableAt}, Price: ${item.discountedPrice}</li>
                ))}
            </ul>
        </div>
    );


};

export default Login;