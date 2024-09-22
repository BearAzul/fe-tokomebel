import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = ({ OpenSidebar }) => {
  const user = useSelector((state) => state.userState.user);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };
  return (
    <header className="header d-block p-3 text-bg-dark z-3 w-100 border-bottom border-secondary">
      <div className="container d-flex align-items-center justify-content-between">
        <button className="d-lg-none border-0 bg-transparent p-0 text-white">
          <i className="ri-menu-line" onClick={OpenSidebar}></i>
        </button>

        <div className="header-right d-flex ms-auto align-items-center">
          <button
            onClick={toggleFullScreen}
            className="border-0 btn btn-sm btn-secondary d-flex justify-content-center rounded px-3 me-3 text-white"
            style={{ width: "25px" }}
          >
            <i
              className={
                isFullScreen ? "ri-fullscreen-exit-fill" : "ri-fullscreen-fill"
              }
            ></i>
          </button>
          <p className="m-0 fm-2 fs-6 me-2 d-lg-block d-none">
            Welcome, {`${user.firstName} ${user.lastName}`}
          </p>
          <div
            style={{ width: "35px", height: "35px" }}
            className="rounded-circle border-2 border border-secondary overflow-hidden"
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="d-block object-fit-cover w-100 h-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Header;
