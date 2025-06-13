import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavDescription from "../common/NavTabs/NavDescription.jsx";
import customAPI from "../api.js";
import { formatToIDR } from "../utils/index.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice.js";
import Loading from "../components/Loading.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { ProductDetailDirect } from "../components/Directlink.jsx";
import { HelmetHead } from "../common/Helmet.jsx";

const DetailProduct = () => {
  const [detailProducts, setDetailProducts] = useState();
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  let { id } = useParams();

  const getDetails = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setDetailProducts(data.data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (!detailProducts) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const productCart = {
    cartId: detailProducts._id + detailProducts.name,
    productId: detailProducts._id,
    image: detailProducts.image,
    name: detailProducts.name,
    summary: detailProducts.summary,
    category: detailProducts.category.name,
    price: detailProducts.price,
    stock: detailProducts.stock,
    amount,
  };

  const handleIncrement = () => {
    if (amount < detailProducts.stock) {
      setAmount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };


  const handleAddToCart = () => {
    dispatch(addToCart({ product: productCart }));
  };

  return (
    <>
      <HelmetHead
        title={`${detailProducts.name}`}
        description={`Beli ${detailProducts.name} hanya di Toko Mebel Amanah dengan harga terbaik.`}
        link={`/shop/${detailProducts._id}`}
      />
      <section id="detailProduct" className="bg-secondary-subtle">
        <BannerHeader bannerTitle="Detail Mebel" />
        <Container className="pt-5 pb-5">
          <ProductDetailDirect />
          <div className="detail__items">
            <Row lg="2" className="g-3 gy-5">
              <Col md="6" className="d-flex">
                <div
                  className="img__items mx-auto bg-light rounded-4 overflow-hidden position-relative"
                  style={{ height: "350px", width: "100%" }}
                >
                  <Image
                    src={detailProducts.image}
                    alt={detailProducts.name}
                    className={`w-100 h-100 d-block mx-auto ${
                      detailProducts.category.name === "Bed"
                        ? "object-fit-cover"
                        : "object-fit-contain"
                    }`}
                  />
                </div>
                {detailProducts.stock < 1 && (
                  <span className="badge text-bg-warning position-absolute m-2 fs-5">
                    Sold Out
                  </span>
                )}
              </Col>
              <Col md="6">
                <div className="spesifik__items fm-2 pt-3 p-md-4">
                  <h1 className="fs-4 fw-semibold m-0">
                    {detailProducts.name}
                  </h1>
                  <p className="mb-2 fs-7">{detailProducts.summary}</p>
                  <p className="fw-medium mb-2">
                    {formatToIDR(detailProducts.price)}
                  </p>
                  {/* <div className="d-flex align-items-center gap-1 mb-3 fs-7">
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    (0.0)
                  </div> */}
                  <div className="fm-3 fs-7 fw-semibold text-bg-dark max-content py-1 px-2 rounded mb-3">
                    {detailProducts.category.name}
                  </div>
                  <p className="fm-2 fs-6 fw-semibold">
                    Stock: {detailProducts.stock}
                  </p>
                  {detailProducts.stock > 0 && (
                    <>
                      <div className="qty__items d-flex align-items-center gap-3 mt-3 mb-4">
                        <QuantitySelector
                          handleIncrement={handleIncrement}
                          handleDecrement={handleDecrement}
                          stock={detailProducts.stock}
                          amount={amount}
                        />
                        <span className="mb-0 fw-semibold">Qty</span>
                      </div>
                      <Button
                        variant="warning"
                        className="fs-7 fw-semibold rounded-1 btn__cart"
                        onClick={handleAddToCart}
                      >
                        Tambah ke Keranjang
                        <i className="ri-shopping-cart-2-line ms-2"></i>
                      </Button>
                    </>
                  )}
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
