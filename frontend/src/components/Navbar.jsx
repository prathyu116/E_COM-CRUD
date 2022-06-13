import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    let USERNAME = JSON.parse(localStorage.getItem("USERNAME"));



  return (
    <div>
      <nav className="navbar bg-primary text-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt=""
              width="30"
              height="24"
            />
          </a>
          <div class="dropdown">
            <button
              class="btn btn-outline-success dropdown-toggle text-white"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {USERNAME ? ` Hey${USERNAME}` : "Hey welocme 🙏"}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link class="dropdown-item" to={USERNAME ? `/Profile/${USERNAME}` : "/login"}>
                  {" "}
                  {USERNAME ? ` MY PROFILE` : "LOGIN"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
