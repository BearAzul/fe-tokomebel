import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/userSlice.js";
import customAPI from "../../api.js";

const BarMenu = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: "ri-dashboard-2-line",
  },
  {
    title: "Admin",
    path: "/admin/user",
    icon: "ri-admin-line",
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: "ri-box-3-line",
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: "ri-shopping-cart-2-line",
  },
];
const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };
  return (
    <aside
      id="sidebar"
      className={`${
        openSidebarToggle ? "sidebar-responsive" : "d-none"
      } d-lg-flex flex-column bg-dark text-light h-100 z-3 border-end border-secondary`}
    >
      <div className="sidebar-title d-flex justify-content-between align-items-center p-3">
        <div className="sidebar-brand">
          <i className="ri-shopping-cart-2-line me-2"></i>
          Toko <span className="text-warning">Mebel</span>
        </div>
        <button
          className="p-0 border-0 bg-transparent text-white ms-3 d-lg-none"
          onClick={OpenSidebar}
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
      <ul className="list-unstyled">
        {BarMenu.map((menu, index) => (
          <li className="sidebar-item p-3" key={index}>
            <NavLink
              to={menu.path}
              className=" text-decoration-none text-light p-3 w-100"
            >
              <i className={`${menu.icon} me-2`}></i> {menu.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <hr />
      <Button variant="danger" size="sm" className="m-3 w-75" onClick={handleLogout}>
        Logout
        <i className="ri-logout-circle-r-line ms-2"></i>
      </Button>
    </aside>
  );
};

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
