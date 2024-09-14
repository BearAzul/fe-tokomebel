import { Row, Col, Button, Image } from "react-bootstrap";
import { generateSelectAmount, formatToIDR } from "../utils/index.jsx";
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { editItem, removeItem } from "../features/cartSlice.js";

const CartItems = ({ cartItem }) => {
  const { cartId, name, summary, category, price, image, amount, productId, stock } = cartItem;
  const dispatch = useDispatch()

  const handleAmount = (e) => {
    dispatch(editItem({cartId, amount: parseInt(e.target.value)}))
  }

  const handleRemoveItem = () => {
    dispatch(removeItem({cartId}))
  }

  return (
    <Row md="3" className="g-3 g-md-0 mb-4 border-bottom pb-3" key={cartId}>
      <Col md="6" xs="12" className="d-flex gap-2">
        <Image
          src={image}
          className="bg-secondary-subtle border-0 rounded object-fit-cover img__cart"
        />
        <div className="ket__cart d-flex flex-column justify-content-between">
          <Link
            to={`/shop/${productId}`}
            className="text-decoration-none text-dark"
          >
            <h1 className="fs-6 fw-bold m-0">{name}</h1>
            <p className="fs-7 mb-2">{summary}</p>
            <p className="fs-7 mb-2 text-bg-dark max-content py-1 px-2 rounded">
              {category}
            </p>
          </Link>
          <div className="d-flex gap-2">
            <select
              name="amount"
              className="form-select border-0 text-bg-warning text-center select select-bordered"
              style={{ width: "80px" }}
              value={amount}
              onChange={handleAmount}
            >
              {generateSelectAmount(stock)}
            </select>
            <Button variant="danger" size="sm" className="fs-7" onClick={handleRemoveItem}>
              <i className="ri-delete-bin-6-line"></i>
            </Button>
          </div>
        </div>
      </Col>
      <Col md="3" xs="6">
        <span className="fw-bold d-block d-md-none">Price:</span>
        <p className="text-start m-0 text-md-center fw-medium">
          {formatToIDR(price)}
        </p>
      </Col>
      <Col md="3" xs="6">
        <span className="fw-bold d-block d-md-none">Total:</span>
        <p className="text-start m-0 text-md-center fw-medium">
          {formatToIDR(price * amount)}
        </p>
      </Col>
    </Row>
  );
};

CartItems.propTypes = {
  cartItem: PropTypes.object.isRequired,
}

export default CartItems;
