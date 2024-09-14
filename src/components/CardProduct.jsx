import "../styles/index.css";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatToIDR } from "../utils";

const CardProduct = ({ product }) => {
  return (
    <div className="card__container">
      <Card className="h-100 w-100 rounded-0 bg-light fm-2 overflow-hidden border-2">
        <div className="">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className={`d-block w-100 rounded-0 ${
              product.category === "Bed"
                ? "object-fit-cover"
                : "object-fit-contain"
            }`}
          />
        </div>
        <Card.Footer className="d-flex align-items-center justify-content-between p-0 bg-light position-relative z-1 w-100 border-2 rounded-0">
          <p className="mb-0 ms-3 ms-md-2 fs-7">{formatToIDR(product.price)}</p>
          <Link to={`/shop/${product._id}`}>
            <Button variant="warning" className="rounded-0">
              <i className="ri-shopping-cart-2-line fs-6"></i>
            </Button>
          </Link>
        </Card.Footer>
      </Card>
      <div className="w-100 text-bg-light text-start fm-2 mt-2 p-0 bg-transparent">
        <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>
        <Card.Text className="fs-7">{product.summary}</Card.Text>
      </div>
    </div>
  );
};

CardProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default CardProduct;
