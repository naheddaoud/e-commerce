import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext"; // استيراد سياق العربة

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let { numOfCartItems } = useContext(CartContext); // استخدام عدد أصناف العربة
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken != null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/products"}>
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/categories"}>
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/brands"}>
                    Brands
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav mb-2">
            <li className="nav-item d-flex align-items-center position-relative">
              <Link className="nav-link position-relative" to={"/cart"}>
                <i className="fas fa-shopping-cart me-2 hover" style={{ fontSize: "1.5rem" }} ></i>
                {numOfCartItems > 0 && (
                  <span
                    className="position-absolute top-0.2 start-85 translate-middle badge rounded-oval bg-danger me-1"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {numOfCartItems}
                  </span>
                )}
              </Link>
              
              <i className="fab fa-facebook me-2" style={{ color: "#370bff", fontSize: "1.5rem"  }}></i>
              <i className="fab fa-twitter me-2" style={{ fontSize: "1.5rem" }}></i>
              <i className="fab fa-instagram me-2 danger" style={{ fontSize: "1.5rem" }}></i>
              <i className="fab fa-youtube me-2" style={{ fontSize: "1.5rem" }}></i>
            </li>
            {userToken != null ? (
              <>
                <li className="nav-item">
                  <span
                    onClick={() => logOut()}
                    className="nav-link active cursor-pointer"
                    aria-current="page"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
