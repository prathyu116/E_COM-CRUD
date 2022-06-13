import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };
  const submitLogin = async () => {
    let res = await fetch(`http://localhost:5000/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(res);
    if (res.status) {
      localStorage.setItem("USERNAME", JSON.stringify(res.user.first_name));
      localStorage.setItem("USERID", JSON.stringify(res.user._id));
      alert("LOGINED SUCCUSFULL");
      navigate("/");

      window.location.reload();
    } else {
      alert("Wrong Email or Password");
    }
  };

  return (
    <>
      {/* <Link>new</Link> */}

      <div className="login-From">
        <h1>Login</h1>

        <input onChange={handleLogin} id="email" type="text" placeholder="email" />
        <input onChange={handleLogin} id="password" type="text" placeholder="Enter password" />
        <button onClick={submitLogin}>Login</button>

        <p
          className="text-primary "
          onClick={() => {
            navigate("/signup");
          }}
        >
          New here...?
        </p>
      </div>
    </>
  );
};

export default Login;
