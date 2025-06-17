import { NavLink, useNavigate } from "react-router-dom"
import { logoutUser } from "../features/userSlice.js"
import { useDispatch } from "react-redux"
import { clearCartItem } from "../features/cartSlice.js"
import customAPI from "../api.js"
import { Dropdown } from "react-bootstrap"
import { googleLogout } from "@react-oauth/google";

export const LoginButton = () => {
  return (
    <NavLink to="/login" className="btn btn-outline-light btn-sm fm-2">Login</NavLink>
  )
}

export const ProfileButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      googleLogout()
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/login");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/login");
    }
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="nav-link text-decoration-none text-white p-0 border-0"
        id="dropdown-user"
      >
        <i className="ri-user-fill fs-6"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/profile">
          <i className="ri-user-line me-2"></i> Profil
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>
          <i className="ri-logout-box-line me-2"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
