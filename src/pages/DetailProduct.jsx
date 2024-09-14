import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavDescription from "../common/NavTabs/NavDescription.jsx";
import customAPI from "../api.js";
import { generateSelectAmount, formatToIDR } from "../utils/index.jsx";
import { useDispatch } from "react-redux"
import { addToCart } from "../features/cartSlice.js";

const DetailProduct = () => {
  const [detailProducts, setDetailProducts] = useState([]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  let { id } = useParams();

  const getDetails = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setDetailProducts(data.data);
  };

  useEffect(() => {
    getDetails();
  });

  if (!detailProducts) {
    return (
      <Container className="py-5 mt-5 text-center fm-2">
        <h1>Product not found</h1>
        <p>The product you are looking for does not exist.</p>
        <Button variant="primary" onClick={() => window.history.back()}>
          <i className="ri-arrow-left-line me-2"></i>
          Go Back
        </Button>
      </Container>
    );
  }

  const productCart = {
    cartId: detailProducts._id + detailProducts.name,
    productId: detailProducts._id,
    image: detailProducts.image,
    name: detailProducts.name,
    summary: detailProducts.summary,
    category: detailProducts.category,
    price: detailProducts.price,
    stock: detailProducts.stock,
    amount,
  }

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({product: productCart}));
  };

  return (
    <>
      <section id="detailProduct" className="bg-secondary-subtle">
        <BannerHeader bannerTitle="Detail Product" />
        <Container className="pt-5 pb-5">
          <div className="detail__items">
            <Row lg="2" className="g-3 gy-5">
              <Col md="6" className="d-flex">
                <div
                  className="img__items mx-auto bg-light rounded-4 overflow-hidden "
                  style={{ height: "350px", width: "100%" }}
                >
                  <Image
                    src={detailProducts.image}
                    alt={detailProducts.name}
                    className={`w-100 h-100 d-block mx-auto ${
                      detailProducts.category === "Bed"
                        ? "object-fit-cover"
                        : "object-fit-contain"
                    }`}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="spesifik__items fm-2 pt-3 p-md-4">
                  <h1 className="fs-4 fw-semibold m-0">
                    {detailProducts.name}
                  </h1>
                  <p className="mb-2 fs-7">{detailProducts.summary}</p>
                  <p className="fw-medium">
                    {formatToIDR(detailProducts.price)}
                  </p>
                  <div className="d-flex align-items-center gap-1 mb-3 fs-7">
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    (0.0)
                  </div>
                  <div className="fm-3 fs-7 fw-semibold text-bg-dark max-content py-1 px-2 rounded mb-3">
                    {detailProducts.category}
                  </div>
                  <p className="fm-2 fs-6 fw-semibold">
                    Stock: {detailProducts.stock}
                  </p>
                  <div className="d-flex gap-3 align-items-center mt-4">
                    <select
                      name="amount"
                      className="form-select border-0 text-bg-warning text-center select select-bordered"
                      style={{ width: "80px" }}
                      onChange={handleAmount}
                    >
                      {generateSelectAmount(detailProducts.stock)}
                    </select>
                    <Button
                      variant="warning"
                      className="fs-7 fw-semibold rounded-1 btn__cart"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                      <i className="ri-shopping-cart-2-line ms-2"></i>
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="12">
                <NavDescription description={detailProducts.description} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DetailProduct;
