import "./Footer.css";
import { contacts, times } from "../../assets/data/DummyData.jsx";
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
            <h2 className="fs-5 text-uppercase mb-4 fm-3 fw-bold">
              Tentang Toko<span className="text-orange">Mebel</span>
            </h2>
            <p className="fm-2 fs-7 mb-2">
              Toko Mebel adalah Aplikasi penyedia furniture dari Toko
              MebelAmanah yang terpercaya dengan menghadirkan produk mebel
              berkualitas tinggi dengan harga terjangkau. Kami menyediakan
              berbagai macam pilihan mebel dari kayu jati, mahoni, dan
              bahanberkualitas lainnya yang dikerjakan langsung oleh
              pengrajinberpengalaman.
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
            <h2 className="text-uppercase fs-5 mb-4 pb-1 fm-3 fw-bold">
              Kontak Kami
            </h2>

            <ul className="list-unstyled fm-2 fs-7">
              {contacts.map((kontak, index) => (
                <li className="mb-3 d-flex align-items-center" key={index}>
                  <span className="fa-li">
                    <i className={`${kontak.ikon} fs-6`} />
                  </span>
                  <a
                    href={kontak.link}
                    aria-label="media link"
                    target="_blank"
                    className="ms-2 text-decoration-none text-white"
                  >
                    {kontak.keterangan}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h2 className="fs-5 text-uppercase mb-4 fm-3 fw-bold">
              Buka Pada Jam:
            </h2>
            <table className="table table-dark">
              <tbody className="font-weight-normal fm-2 fs-7">
                {times.map((time, index) => (
                  <tr key={index}>
                    <td>{ time.hari }</td>
                    <td>:</td>
                    <td>{ time.jam }</td>
                  </tr>
                ))}
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
