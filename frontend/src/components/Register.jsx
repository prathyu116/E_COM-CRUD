import React, { useState } from "react";
import "./Register.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
const Register = () => {
  const [registerData, setRegisterData] = useState([]);
  const navigate = useNavigate()
  const handleRegister = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(registerData);
  const submitRegister = async () => {
    let res = await fetch(`http://localhost:5000/users/create`, {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(res);
    if (res.message === "error") {
      alert("user exist");
    } else {
      alert("Signup-Succus");
      navigate("/login")
      
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input onChange={handleRegister} type="text" placeholder="Enter Firstname" id="first_name" />
      <input onChange={handleRegister} type="text" placeholder="Enter lastname" id="last_name" />
      <input onChange={handleRegister} type="text" placeholder="Enter email" id="email" />
      <input onChange={handleRegister} type="text" placeholder="Enter password" id="password" />

      
      <button onClick={submitRegister}>Register</button>
    </div>
  );
};

export default Register;
