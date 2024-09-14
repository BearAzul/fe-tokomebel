import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FreeShipping from "./FreeShipping.jsx";
import "./Navbar.css";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarPage = () => {
  const user = useSelector((state) => state.userState.user);
  const countCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <>
      <FreeShipping />
      <Navbar
        expand="lg"
        sticky="top"
        className="z-3 border-0 w-100 bg-dark-green shadow"
      >
        <Container>
          <HashLink
            smooth
            to="/#home"
            className="navbar-brand fw-bold fs-4 m-0 p-0 fm-1"
          >
            <span className="text-color-logo1">Toko</span>
            <span className="text-color-logo2">Mebel</span>
          </HashLink>
          <div className="ms-auto me-3 d-flex d-lg-none gap-3 align-items-center justify-content-center">
            {user ? (
              <NavLink to="/profile" className="nav-link">
                <i className="ri-user-fill fs-6"></i>
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-link">
                <i className="ri-user-fill fs-6"></i>
              </NavLink>
            )}

            <NavLink to="/cart" className="nav-link position-relative">
              <i className="ri-shopping-cart-2-fill fs-6 "></i>
              <span
                className={`indicator__cart ${
                  !countCart ? "d-none" : "d-flex"
                }`}
              >
                {countCart}
              </span>
            </NavLink>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="mt-4 mt-lg-0">
            <Nav className="mx-auto w-50 text-center text-uppercase">
              <HashLink to="/#bestseller" className="nav-link">
                Best Seller
              </HashLink>
              <NavLink to="/shop" className="nav-link">
                Shop
              </NavLink>
              <HashLink to="/#customize" className="nav-link">
                Customize
              </HashLink>
              <HashLink smooth to="/#recent" className="nav-link">
                Style Guide
              </HashLink>
            </Nav>
          </Navbar.Collapse>
          <div className="d-none ms-lg-5 d-lg-flex gap-3 align-items-center justify-content-center">
            {user ? (
              <NavLink to="/profile" className="nav-link">
                <i className="ri-user-fill fs-6"></i>
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-link">
                <i className="ri-user-fill fs-6"></i>
              </NavLink>
            )}
            <span className="text-white">l</span>
            <NavLink to="/cart" className="nav-link me-auto position-relative">
              <i className="ri-shopping-cart-2-fill fs-6 "></i>
              <span
                className={`indicator__cart ${
                  !countCart ? "d-none" : "d-flex"
                }`}
              >
                {countCart}
              </span>
            </NavLink>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPage;
