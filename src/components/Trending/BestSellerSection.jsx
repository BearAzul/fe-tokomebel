import "./BestSeller.css";
import "../../styles/index.css";
import { Container, Row, Col} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { CardProductCustomer } from "../CardProduct.jsx";
import customAPI from "../../api.js";

export const loader = async () => {
  
  const { data } = await customAPI.get("/product?limit=all");
  const dataProducts = data.data;
  const response = await customAPI.get("/category");
  const categories = response.data.data
  return { dataProducts, categories };
};

const BestSellerSection = () => {  
  const [selectedCategory, setSelectedCategory] = useState("Kursi");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { dataProducts, categories } = useLoaderData();
   const filterProducts = () => {
     const filtered = dataProducts.filter((product) =>
       selectedCategory ? product.category.name === selectedCategory : true
     );
     setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [dataProducts, selectedCategory]);

  return (
    <>
      <section id="bestseller" className="py-5 bg-light">
        <Container className="my-5 ">
          <div
            className="title text-uppercase max-content mx-auto mb-4"
            data-aos="fade-left"
          >
            <p className="py-1 px-2 text-orange border border-secondary max-content mx-auto fm-1 fs-7 fw-bold fst-italic mb-1">
              Best Mebel
            </p>
            <h3 className="fm-2 fs-4 fw-bold text-dark-dark">Produk Mebel Terkait</h3>
          </div>
          <div className="p-2">
            <div className="category__btn ">
              <Row xs="2" md="4" className="g-2">
                {categories.map((category, index) => (
                  <Col key={index}>
                    <button
                      className={`fm-2 w-100 fw-semibold border-0  py-2 ${
                        category.name === selectedCategory ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(`${category.name}`)}
                    >
                      <i className={`${category.icon} fs-5`}></i>
                      <span className="ms-2">{category.name}</span>
                    </button>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="product__container mt-3">
              <Row xs="2" md="3" lg="4" className="g-4">
                {filteredProducts.map((product) => (
                  <Col key={product._id} data-aos="zoom-in">
                    <CardProductCustomer
                      product={product}
                      icons="ri-shopping-cart-2-line"
                    />
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
