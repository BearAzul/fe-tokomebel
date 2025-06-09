import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import "../styles/index.css";
import Loading from "../components/Loading.jsx";

const PublicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      {isPageLoading ? (
        <section id="loading" className="d-flex justify-content-center align-items-center">
          <Loading />
        </section>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
};

export default PublicLayout;
