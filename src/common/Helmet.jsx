import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

export const HelmetHead = ({
  title = "Beranda",
  description = "Toko Mebel Amanah terbaik untuk kebutuhan furniture Anda. Temukan berbagai macam produk mebel berkualitas dengan harga terjangkau dan layanan pengiriman cepat.",
  link = "/",
}) => {
  return (
    <Helmet>
      <title>{title} | Aplikasi Toko Mebel</title>
      <meta name="og:url" content="https://fe-tokomebel.vercel.app" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/BearAzul/fe-tokomebel/refs/heads/client/src/assets/Image/logo_toko_mebel.png"
      />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Aplikasi Toko Mebel, Mebel Amanah, furniture, mebel berkualitas, pengiriman cepat, perabotan rumah, sofa, meja, kursi, lemari"
      />
      <meta name="author" content="Fullstack Dev. - Adya Abdu Azizul Hakim" />
      <meta name="robots" content="index, follow" />
      <meta
        name="og:street-address"
        content="Dk. Plebean, Ds. Plelen Rt.04/Rw.04"
      />
      <meta name="og:phone_number" content="+62 813-2617-7128" />
      <meta name="og:email" content="tokoamanahmebel@gmail.com" />
      <meta name="og:site_name" content="Aplikasi Toko Mebel" />
      <meta itemProp="name" content="Aplikasi Toko Mebel" />
      <meta
        itemProp="description"
        content="Toko Mebel Amanah terbaik untuk kebutuhan furniture Anda. Temukan berbagai macam produk mebel berkualitas dengan harga terjangkau dan layanan pengiriman cepat."
      />
      <meta
        itemProp="image"
        content="https://raw.githubusercontent.com/BearAzul/fe-tokomebel/refs/heads/client/src/assets/Image/logo_toko_mebel.png"
      />
      <link rel="canonical" href={`https://fe-tokomebel.vercel.app${link}`} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

HelmetHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};
