import "../styles/index.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatToIDR } from "../utils/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearCartItem } from "../features/cartSlice.js";
import { useNavigate } from "react-router-dom";
import customAPI from "../api.js";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const user = useSelector((state) => state.userState.user);
  const numItems = useSelector((state) => state.cartState.numItemsInCart);
  const carts = useSelector((state) => state.cartState.CartItems);
  const { cartTotal } = useSelector((state) => state.cartState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    const newArrayCart = carts.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      };
    });

    try {
      const response = await customAPI.post("/order", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        address: data.address,
        cartItem: newArrayCart,
      });

      const snapToken = response.data.token;

      window.snap.embed(snapToken.token, {
        embedId: "snap-container",
        onSuccess: function (result) {
          console.log(result);
          dispatch(clearCartItem())
          navigate('/cart')
        },
        onPending: function (result) {
          console.log(result);
          alert("Pending");
        },
        onError: function (result) {
          console.log(result);
          alert("Gagal");
        },
      });
      toast.success("Your order has been received");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="mb-2 fm-4">
        <p className="m-0 fs-5 fw-semibold">Shipping Information</p>
        <hr />
      </div>
      <form method="POST" onSubmit={handlePayment} className="fm-2">
        <Row md="2" className="g-2 mb-3">
          <Col>
            <div className="form-floating">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                defaultValue={user.firstName}
                readOnly
              />
              <label htmlFor="fullname">First Name</label>
            </div>
          </Col>
          <Col>
            <div className="form-floating">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                defaultValue={user.lastName}
                readOnly
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </Col>
          <Col md="12">
            <div className="form-floating">
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                defaultValue={user.email}
                readOnly
              />
              <label htmlFor="email">Email</label>
            </div>
          </Col>
          <Col>
            <div className="form-floating">
              <input
                type="number"
                name="phone"
                id="phone"
                className="form-control"
                defaultValue={user.phone}
                readOnly
              />
              <label htmlFor="phone">No. Telp</label>
            </div>
          </Col>
          <Col>
            <div className="form-floating">
              <input
                type="text"
                name="city"
                id="city"
                className="form-control"
                defaultValue={user.city}
                readOnly
              />
              <label htmlFor="city">City</label>
            </div>
          </Col>
          <Col md="12">
            <div className="form-floating">
              <textarea
                name="address"
                id="address"
                className="form-control"
                defaultValue={user.address}
                readOnly
                style={{height: "100px"}}
              ></textarea>
              <label htmlFor="address">Address</label>
            </div>
          </Col>
        </Row>
        <div className="bg-white p-2 rounded mb-3">
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
                <td className="text-end">{formatToIDR(120000)}</td>
              </tr>
              <tr>
                <td className="fw-medium">Total</td>
                <td>:</td>
                <td className="text-end">{formatToIDR(cartTotal + 120000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-2 fs-7 input-group">
          {numItems ? (
            <button
              className="btn btn-success w-100 text-uppercase fw-semibold"
              type="submit"
            >
              Payment
            </button>
          ) : (
            <Link to="/shop" className="btn btn-primary w-100">
              The Cart is Empty, going to the shop?
            </Link>
          )}
        </div>
      </form>
    </>
  );
};

export default Checkout;
