import "../styles/index.css";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, useRevalidator } from "react-router-dom";
import { formatToIDR } from "../utils";
import { toast } from "react-toastify";
import customAPI from "../api.js";
import Swal from "sweetalert2";

export const CardProductCustomer = ({ product, icons, className }) => {
  return (
    <div className="card__container">
      <Card className="h-100 w-100 rounded-0 bg-light fm-2 overflow-hidden border-2">
        <div className="position-relative">
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
          {product.stock < 1 && (
            <span className="badge text-bg-warning position-absolute m-2 z-1 top-0">
              Sold Out
            </span>
          )}
        </div>
        <Card.Footer className="d-flex align-items-center justify-content-between p-0 bg-light position-relative z-1 w-100 border-2 rounded-0">
          <Card.Text className="mb-0 ms-3 ms-md-2 fs-7">
            {formatToIDR(product.price)}
          </Card.Text>
          <Link
            to={`/shop/${product._id}`}
            className="btn btn-warning rounded-0"
          >
            <i className={`${icons} fs-6`}></i>
          </Link>
        </Card.Footer>
      </Card>
      <div
        className={`w-100 text-bg-light text-start fm-2 mt-2 p-0 bg-transparent ${className}`}
      >
        <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>
        <Card.Text className="fs-7">{product.summary}</Card.Text>
      </div>
    </div>
  );
};

export const CardProductAdmin = ({ product, icons, className }) => {
  const { revalidate } = useRevalidator();
  const handleDelete = async (product, revalidate) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the product: ${product.name}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/product/${product._id}`);
          toast.success(`Product ${product.name} deleted successfully`);
          revalidate(); // Call your revalidation or update function
        } catch (error) {
          toast.error("Failed to delete product. Please try again.");
        }
      }
    });
  };
  return (
    <div className="card__container position-relative">
      <Button
        variant="danger"
        size="sm"
        className="position-absolute z-1 m-2"
        onClick={() => handleDelete(product, revalidate)}
      >
        <i className="ri-delete-bin-5-line fs-6"></i>
      </Button>
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
          <Card.Text className="mb-0 ms-3 ms-md-2 fs-7">
            {formatToIDR(product.price)}
          </Card.Text>
          <Link
            to={`/admin/products/${product._id}/edit`}
            className="btn btn-warning rounded-0"
          >
            <i className={`${icons} fs-6`}></i>
          </Link>
        </Card.Footer>
      </Card>
      <div
        className={`w-100 text-bg-light text-start fm-2 mt-2 p-0 bg-transparent ${className}`}
      >
        <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>
        <Card.Text className="fs-7">{product.summary}</Card.Text>
      </div>
    </div>
  );
};

CardProductCustomer.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  icons: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CardProductAdmin.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  icons: PropTypes.string.isRequired,
  className: PropTypes.string,
};
