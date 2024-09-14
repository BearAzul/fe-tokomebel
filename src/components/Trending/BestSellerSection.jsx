import "./BestSeller.css";
import "../../styles/index.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import Categories from "../../assets/data/Category.jsx";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatToIDR } from "../../utils/index.jsx";
import customAPI from "../../api.js";

export const loader = async () => {
  
  const { data } = await customAPI.get("/product");
  const filterProducts = data.data;
  return { filterProducts };
};

const BestSellerSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Chair");
  const { filterProducts } = useLoaderData();

  const filteredProducts = selectedCategory
    ? filterProducts.filter((product) => product.category === selectedCategory)
    : filterProducts;
  return (
    <>
      <section id="bestseller" className="py-5 bg-light">
        <Container className="my-5 ">
          <div
            className="title text-uppercase max-content mx-auto mb-4"
            data-aos="fade-left"
          >
            <p className="py-1 px-2 text-orange border border-secondary max-content mx-auto fm-1 fs-7 fw-bold fst-italic mb-1">
              Best Seller
            </p>
            <h3 className="fm-2 fs-4 fw-bold text-dark-dark">Home Decor</h3>
          </div>
          <div className="p-2">
            <div className="category__btn ">
              <Row className="g-2">
                {Categories.map((category, index) => (
                  <Col key={index}>
                    <button
                      className={`fm-2 w-100 fw-semibold border-0  py-2 ${
                        category.title === selectedCategory ? "active" : ""
                      }`}
                      data-aos="zoom-out-down"
                      onClick={() => setSelectedCategory(`${category.title}`)}
                    >
                      <i className={`${category.icons} fs-5`}></i>
                      <span className="ms-2">{category.title}</span>
                    </button>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="product__container mt-3">
              <Row xs="2" md="3" lg="4" className="g-4">
                {filteredProducts.map((product) => (
                  <Col key={product._id} data-aos="zoom-in">
                    <div className="card__container">
                      <Card className="h-100 w-100 rounded-0 bg-secondary-subtle fm-2 overflow-hidden ">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          alt={product.name}
                          className={`d-block w-100 rounded-0 ${
                            selectedCategory === "Bed"
                              ? "object-fit-cover"
                              : "object-fit-contain"
                          }`}
                        />
                        <Card.Footer className="d-flex align-items-center justify-content-between p-0 bg-light position-relative z-1 w-100 border-2 rounded-0">
                          <p className="mb-0 ms-2 ms-md-3">
                            {formatToIDR(product.price)}
                          </p>
                          <Link
                            to={`/shop/${product._id}`}
                            className="rounded-0 btn btn-warning"
                          >
                            <i className="ri-shopping-cart-2-line fs-6"></i>
                          </Link>
                        </Card.Footer>
                      </Card>
                      <div className="w-100 text-bg-light text-start fm-2 mt-2 p-0 bg-transparent">
                        <Card.Title className="fs-6 fw-semibold">
                          {product.name}
                        </Card.Title>
                        <Card.Text className="fs-7">
                          {product.summary}
                        </Card.Text>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BestSellerSection;
