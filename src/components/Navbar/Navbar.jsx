import { Nav, Navbar, Container } from "react-bootstrap"
import "./Navbar.css";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import UserActions from "../UserActions.jsx";

const NavbarPage = () => {

  return (
    <>
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

          {/* Mobile Mode */}
          <UserActions className="ms-auto me-3 d-flex d-lg-none gap-3 align-items-center" />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="mt-4 mt-lg-0">
            <Nav className="mx-auto w-50 text-center text-uppercase">
              <HashLink to="/#home" className="nav-link">
                Beranda
              </HashLink>
              <Link to="/shop" className="nav-link">
                Katalog
              </Link>
              <HashLink to="/#customize" className="nav-link">
                Desain
              </HashLink>
              <HashLink smooth to="/#recent" className="nav-link">
                Setup Ruangan
              </HashLink>
            </Nav>
          </Navbar.Collapse>

          {/* Desktop Mode */}
          <UserActions className="d-none ms-lg-5 d-lg-flex gap-3 align-items-center" />

        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPage;
