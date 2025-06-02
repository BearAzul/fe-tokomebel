import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import "../styles/index.css";
import Loading from "../components/Loading.jsx";
import { Helmet } from "react-helmet-async";

const PublicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Helmet>
        <title>Aplikasi Toko Mebel</title>
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/BearAzul/fe-tokomebel/refs/heads/client/src/assets/Image/logo_toko_mebel.png"
        />
        <meta
          name="og:description"
          content="Toko Mebel Amanah terbaik untuk kebutuhan furniture Anda. Temukan berbagai macam produk mebel berkualitas dengan harga terjangkau dan layanan pengiriman cepat."
        />
        <meta
          name="keywords"
          content="Aplikasi Toko Mebel, Mebel Amanah, furniture, mebel berkualitas, beli mebel online, toko furniture, furniture murah, pengiriman cepat, perabotan rumah, sofa, meja, kursi, lemari"
        />
        <meta name="author" content="Fullstack Dev. - Adya Abdu Azizul Hakim" />
        <meta name="robots" content="index, follow" />
        <meta
          name="og:street-address"
          content="Dk. Plebean, Ds. Plelen Rt.04/Rw.04"
        />
        <meta name="og:phone_number" content="+62 813-2617-7128" />
        <meta name="og:email" content="tokoamanahmebel@gmail.com" />
      </Helmet>
      <Navbar />
      {isPageLoading ? <Loading /> : <Outlet />}
      <Footer />
    </>
  );
};

export default PublicLayout;
