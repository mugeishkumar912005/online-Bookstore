import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Book from './BOOKSTORE/book.png';

const Login = (props) => {
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [PassWord, setPass] = useState("");
    const [Login, SetLog] = useState(false);

    const Log = async (e) => {
        e.preventDefault();
        try {
            const User = await axios.post("http://localhost:5000/Login", {
                Name,
                PassWord
            })
            if (User.data.msg === "success") {
                SetLog(true);
                console.log("Login Success");
                const id = User.data.userid;
                navigate(`/home?id=${id}`);
            } else {
                {alert("User not Found");}
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <>
            <div id="logh1">
                <h1><span><img src={Book} alt="" width="50px"/> BookWorms</span></h1>
            </div>

            <div className="Logdiv">
                <h1>Login</h1>
                <form>
                    <input value={Name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Name" required />
                    <input value={PassWord} onChange={(e) => { setPass(e.target.value) }} type="password" placeholder="PassWord" required />
                    <button id="Lbt" onClick={Log}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;
