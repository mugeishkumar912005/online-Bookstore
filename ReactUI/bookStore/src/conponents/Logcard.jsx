import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import Book from './BOOKSTORE/book.png';

const Login = () => {
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [PassWord, setPass] = useState("");

    const Log = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/Login", {
                Name,
                PassWord
            });
            console.log('Response data:', response.data);
            console.log('User ID:', response.data.userid); 
            if (response.data.msg === "success") {
                console.log("Login Success");
                const id = response.data.userid; // Use lowercase 'userid'
                localStorage.setItem("userId", id); // Use lowercase 'userId'
                navigate(`/home?name=${Name}&id=${id}`);
            } else {
                alert("User not Found");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    
    
    return (
        <div className="login-container">
            <div className="logo-header">
                <h1><img src={Book} alt="BookWorms Logo" width="50px"/> BookWorms</h1>
            </div>

            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={Log}>
                    <input value={Name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required />
                    <input value={PassWord} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required />
                    <button type="submit" id="login-button">Login</button>
                </form>
                <div className="signup-link">
                    <a href="/signup">Don't have an account? Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
