import "./Footer.css";
const Footer = () => {
  return (
    <footer
      id="footer"
      className="text-white text-center text-lg-start"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="container p-4 pt-5">
        <div className="row mt-4">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fm-3 fw-bold">
              Tentang Toko<span className="text-orange">Mebel</span>{" "}
            </h5>
            <p className="fm-2 fs-7 mb-2">
              Toko Mebel adalah Aplikasi penyedia furniture dari Toko Mebel Amanah yang terpercaya dengan
              menghadirkan produk mebel berkualitas tinggi dengan harga
              terjangkau. Kami menyediakan berbagai macam pilihan mebel dari
              kayu jati, mahoni, dan bahan berkualitas lainnya yang dikerjakan
              langsung oleh pengrajin berpengalaman.
            </p>
            <p className="fm-2 fs-7">
              Toko Mebel Amanah juga melayani pemesanan custom sesuai keinginan,
              serta memberikan pelayanan pengiriman yang aman dan tepat waktu.
            </p>
            {/* <div className="mt-4 d-flex gap-2 media">
              <a type="button" className="btn btn-warning ">
                <i className="ri-facebook-box-fill" />
              </a>

              <a type="button" className="btn btn-warning ">
                <i className="ri-instagram-fill" />
              </a>

              <a type="button" className="btn btn-warning">
                <i className="ri-twitter-x-fill" />
              </a>

            </div> */}
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1 fm-3 fw-bold">
              Kontak Kami
            </h5>

            <ul className="list-unstyled fm-2 fs-7">
              <li className="mb-3 d-flex">
                <span className="fa-li">
                  <i className="ri-map-pin-line" />
                </span>
                <span className="ms-2">
                  Plebean Rt.04/Rw.04 Plelen, Kec. Gringsing, Kab. Batang, Jawa
                  Tengah 51281
                </span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="ri-mail-line" />
                </span>
                <span className="ms-2">tokoamanahmebel@gmail.com</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="ri-phone-fill" />
                </span>
                <span className="ms-2">(+62) 813-2617-7128</span>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fm-3 fw-bold">Buka Pada Jam:</h5>
            <table className="table table-dark">
              <tbody className="font-weight-normal fm-2 fs-7">
                <tr>
                  <td>Senin - Kamis</td>
                  <td>:</td>
                  <td>08:00 - 17:30 WIB</td>
                </tr>
                <tr>
                  <td>Jum`at - Sabtu:</td>
                  <td>:</td>
                  <td>08:00 - 11:00 WIB</td>
                </tr>
                <tr>
                  <td>Minggu</td>
                  <td>:</td>
                  <td>Libur</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <p className="m-0 fm-3 fs-7">
          &copy; {new Date().getFullYear()} - Toko Mebel Amanah. All Right
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
