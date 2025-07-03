import { Nav, Card, Image } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import SnapPay from "../../assets/Image/PaymentMethode_snap.png"
// import { useSelector } from "react-redux";

const NavDescription = ({ description }) => {
  const [activeTab, setActiveTab] = useState("description");
  //  const user = useSelector((state) => state.userState.user);
  return (
    <>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey="description"
        className="fm-4 fw-semibold"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="description"
            className="text-dark border-0"
            active={activeTab === "description"}
            onClick={() => setActiveTab("description")}
            aria-label="Tabs"
          >
            Deskripsi
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="orderer"
            className="text-dark border-0"
            active={activeTab === "orderer"}
            onClick={() => setActiveTab("orderer")}
            aria-label="Tabs"
          >
            Cara Memesan Mebel
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "description" && (
        <Card
          className={`p-3 border-0 border-top-0 rounded-0 rounded-bottom ${activeTab === "description" ? "rounded-end" : ""
            }`}
        >
          <Card.Body>
            <div className="fm-2" dangerouslySetInnerHTML={{ __html: description }} />
          </Card.Body>
        </Card>
      )}
      {activeTab === "orderer" && (
        <Card
          className={`p-3 border-0 border-top-0 rounded-0 rounded-bottom ${activeTab === "orderer" ? "rounded-start" : ""
            }`}
        >
          <Card.Body className="fm-2">

            <article
              id="order-guide"
              role="tabpanel"
              aria-labelledby="order-tab"
            >
              <h5 className="mb-2">Cara Memesan Mebel:</h5>
              <ol>
                <li>
                  Pilih jumlah produk yang diinginkan menggunakan tombol + atau
                  -.
                </li>
                <li>
                  Klik tombol <span className="btn btn-sm btn-warning  fw-semibold fs-7">Tambah ke Keranjang
                    <i className="ri-shopping-cart-2-line ms-2"></i>
                  </span>.
                </li>
                <li>
                  Buka halaman <Link to="/cart" className="text-dark">Keranjang</Link> dan pastikan produk
                  yang dipilih sudah benar.
                </li>
                <li>
                  Klik tombol <span className="btn btn-sm btn-primary fw-semibold fs-7">Checkout</span>.
                </li>
                <li>Pastikan informasi pengiriman dan kontak dengan benar. Jika belum silahkan lengkapi melalui halaman <Link to="/profile" className="text-dark">Profil</Link></li>
                <li>
                  Lanjutkan pembayaran melalui metode yang tersedia (Midtrans). Pilih Metode Pembayaran yang diinginkan.
                  <br />
                  <Image src={SnapPay} alt="Image PaymentMethode" className="payment_snap_methode d-block m-2 object-fit-cover" />
                </li>
                <li>
                  Setelah pembayaran berhasil, konfirmasi dan status pesanan
                  akan ditampilkan.
                </li>
              </ol>
            </article>
            {/* <Card.Text className="fm-2">
              No reviews yet. Be the first to review!
            </Card.Text>
            <hr />
            <Form className="w-100">
              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Your Name</Form.Label>
                <Form.Control
                  type="text"
                  className="fm-2 fw-medium"
                  disabled
                  readOnly
                  value={!user ? "" : `${user.firstName} ${user.lastName}`}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Your Comments</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Group className="mb-2">
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
              </Form.Group>
              <Form.Group className="mb-2">
                <Button variant="success">Send</Button>
              </Form.Group>
            </Form> */}

          </Card.Body>
        </Card>
      )}
    </>
  );
};

NavDescription.propTypes = {
  description: PropTypes.string,
};

export default NavDescription;
