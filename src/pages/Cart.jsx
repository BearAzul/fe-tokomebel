import { Container, Row, Col } from "react-bootstrap";
import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { Link } from "react-router-dom";
import "../styles/index.css";
import { useSelector } from "react-redux";
import { formatToIDR } from "../utils/index.jsx";
import CartItems from "../components/CartItems.jsx"

const TableHeader = [
  {
    id: 0,
    title: "Product Details",
    col: 6,
    align: "start",
  },
  {
    id: 1,
    title: "Price",
    col: 3,
    align: "center",
  },
  {
    id: 2,
    title: "Total",
    col: 3,
    align: "center",
  },
];

const Cart = () => {
  const cartListItems = useSelector((state) => state.cartState.CartItems);
  const numItems = useSelector((state) => state.cartState.numItemsInCart);
  const user = useSelector((state) => state.userState.user);
  const { cartTotal } = useSelector((state) => state.cartState);

  let delivery
  if (!numItems) {
    delivery = 0
  } else {
    delivery = 120000;
  }
  return (
    <>
      <section id="cart" className="pb-5 bg-secondary-subtle overflow-hidden">
        <BannerHeader bannerTitle="CART" />
        <Container
          className="my-5"
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0, 0.1)",
          }}
        >
          <Row lg="2" className="gx-2 g-md-0 h-max-content">
            <Col lg="8" className="p-3 bg-white">
              <div className="title__cart d-flex justify-content-between align-items-center w-100 pb-3 mb-3 border-bottom border-2 border-secondary-subtle">
                <h1 className="m-0 fs-5 fw-bold fm-2">Shopping Cart</h1>
                <p className="m-0 fw-semibold fm-2">{numItems} items</p>
              </div>
              <Row
                xs="3"
                className="g-0 text-uppercase d-md-flex d-none text-center mb-3"
              >
                {TableHeader.map((header) => (
                  <Col key={header.id} md={header.col} className={`text-${header.align}`}>
                    <p className="p-0 border-0 fw-bold fs-7">{header.title}</p>
                  </Col>
                ))}
              </Row>
              {numItems === 0 ? (
                <Row>
                  <Col xs="12">
                    <h1 className="text-center py-5 fs-6 fw-semibold m-0 fst-italic">
                      Your Cart is empty
                    </h1>
                  </Col>
                </Row>
              ) : (
                cartListItems.map((item, index) => (
                  <CartItems key={index} cartItem={item} />
                ))
              )}
            </Col>
            <Col lg="4" className="p-3 bg-dark-subtle h-max-content">
              <div className="title__shipping d-flex justify-content-between align-items-center w-100 pb-3 mb-3 border-bottom border-2 border-secondary">
                <h1 className="m-0 fs-5 fw-bold fm-2">Order Summary</h1>
              </div>
              <div className="order__summary fm-2">
                <table className="w-100">
                  <tbody>
                    <tr>
                      <td className="fw-medium">Subtotal</td>
                      <td>:</td>
                      <td className="text-end">{formatToIDR(cartTotal)}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Delivery</td>
                      <td>:</td>
                      <td className="text-end">
                      {formatToIDR(delivery)}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Total</td>
                      <td>:</td>
                      <td className="text-end">
                        {formatToIDR(cartTotal + delivery)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {user ? (
                  <Link
                    to="/checkout"
                    className="btn btn-primary btn-sm w-100 my-3"
                  >
                    Checkout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary btn-sm w-100 my-3"
                  >
                    Please Login to Checkout
                  </Link>
                )}
                <Link
                  to="/shop"
                  className="text-decoration-none fm-2 fs-7 fw-medium"
                >
                  <i className="ri-arrow-left-line me-1"></i>
                  Continue Shopping
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;
