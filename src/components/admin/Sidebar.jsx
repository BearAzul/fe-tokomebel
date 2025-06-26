import PropTypes from "prop-types";
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice.js";
import customAPI from "../../api.js";

const BarMenu = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: "ri-dashboard-2-line",
    roles: ["owner"],
  },
  {
    title: "Profil Admin",
    path: "/admin/user",
    icon: "ri-admin-line",
    roles: ["owner", "courier"],
  },
  {
    title: "Kategori",
    path: "/admin/category",
    icon: "ri-list-view",
    roles: ["owner"],
  },
  {
    title: "Produk Mebel",
    path: "/admin/products",
    icon: "ri-box-3-line",
    roles: ["owner"],
  },
  {
    title: "Pelanggan",
    path: "/admin/customers",
    icon: "ri-team-line",
    roles: ["owner"],
  },
  {
    title: "Pesanan",
    path: "/admin/orders",
    icon: "ri-shopping-cart-2-line",
    roles: ["owner", "courier"],
  },
];


const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const user = useSelector((state) => state.userState.user);
  const [visibleMenu, setVisibleMenu] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && user.role) {
      const filteredMenu = BarMenu.filter(menu =>
        menu.roles.includes(user.role)
      );
      setVisibleMenu(filteredMenu);
    }
  }, [user]);

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
      className={`${openSidebarToggle ? "sidebar-responsive" : "d-none"
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
      <div className="d-grid">
        {visibleMenu.map((menu, index) => (
          <Link
            key={index}
            to={menu.path}
            className={`sidebar-item p-2 text-decoration-none text-light py-3 px-4 w-100 ${location.pathname === menu.path ? "text-bg-secondary" : ""
              }`}
          >
            <i className={`${menu.icon} me-2`}></i> {menu.title}
          </Link>
        ))}
      </div>
      <hr />
      <Button
        variant="danger"
        size="sm"
        className="m-3 w-75"
        onClick={handleLogout}
      >
        Logout
        <i className="ri-logout-circle-r-line ms-2"></i>
      </Button>
      <hr />
      <p className="fs-7 text-center fm-3">
        All Right Reserved. <br /> Toko Mebel {new Date().getFullYear()}
      </p>
    </aside>
  );
};

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
