import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <nav>
      <div className="logo">
        Mill Cart 🛒
      </div>
      <div className="pages">
        <ul>
          <li className="des">
            <Link to="/" className="des">Home</Link>
          </li>
          <li className="des">
            <Link to="/contact" className="des">Contact</Link>
          </li>
          <li className="des">
            <Link to="/cart" className="des">Cart</Link>
          </li>
        </ul>
      </div>
      <div className="page-2">
        <ul>
          <li>
          {isLoggedIn ? (
            <li className="logout">
              <button onClick={handleLogout} >Logout</button>
            </li>
          ) : (
            <li className="des">
              <Link to="/login" className="des">Login / Register</Link>
            </li>
          )}
          </li>
        </ul>
        </div>
    </nav>
  );
};

export default NavigationBar;
