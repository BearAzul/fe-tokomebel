import { useState } from "react";
import Header from "../components/admin/Header.jsx";
import Sidebar from "../components/admin/Sidebar.jsx";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan Login untuk akses halaman ini");
    return redirect("/login");
  }

  if (user.role !== "owner") {
    toast.error("Anda bukan admin, anda tidak dapat mengakses halaman ini");
    return redirect("/");
  }
  return null;
};

const AdminLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <div className="grid-container container-fluid p-0">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <main className="p-3 text-bg-dark">
          {isPageLoading ? <Loading /> : <Outlet />}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
