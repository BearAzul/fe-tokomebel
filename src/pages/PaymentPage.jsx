import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { Container, Row, Col } from "react-bootstrap";
import Checkout from "../components/Checkout.jsx";
import { toast } from "react-toastify"
import { redirect } from "react-router-dom";

export const loader = (storage) => () => {
  const user = storage.getState().userState.user
  if (!user) {
    toast.warn("Silahkan Login untuk akses halaman Pembayaran");
    return redirect("/login")
  }
  return null
}

const PaymentPage = () => {
  return (
    <section id="checkout" className="pb-5 bg-secondary-subtle overflow-hidden">
      <BannerHeader bannerTitle="CHECKOUT" />
      <Container
        className="my-5"
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0, 0.1)",
        }}
      >
        <Row md="2" className="g-2">
          <Col lg="8">
            <Checkout />
          </Col>
          <Col lg="4">
            <div id="snap-container" className="d-flex justify-content-center">

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaymentPage;
