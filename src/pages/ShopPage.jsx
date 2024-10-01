/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/index.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { useState, useEffect } from "react";
import customAPI from "../api.js";
import { CardProductCustomer } from "../components/CardProduct.jsx";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  Form,
  useNavigation,
} from "react-router-dom";
import Loading from "../components/Loading.jsx";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });
  const response = await customAPI.get("/category")
  const dataProducts = data.data;

  const categories = response.data.data;
  const pagination = data.pagination;

  return { dataProducts, params, pagination, categories };
};

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { dataProducts, pagination, params, categories } = useLoaderData();
  const { page, totalPage } = pagination;
  const { name } = params;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  
  const pages = Array.from({ length: totalPage }, (_, index) => {
    return index + 1;
  });

  const handleChangePage = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const filterProducts = () => {
    const filtered = dataProducts.filter(
      (product) =>
        (selectedCategory ? product.category.name === selectedCategory : true)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [dataProducts, selectedCategory]);

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleClear = () => {
    setSelectedCategory("");
    navigate("/shop");
  };

  return (
    <>
      <section id="shop" className="bg-light pb-4 overflow-hidden">
        <BannerHeader bannerTitle="SHOP" />
        <Container className="my-4">
          <Row md="2" className="g-0 g-md-3 g-lg-5 ">
            <Col
              md="3"
              lg="2"
              className="bg-light p-3 rounded h-max-content "
              data-aos="fade-right"
            >
              <div className="category__product">
                <h1 className="fw-semibold fs-5 fm-4 mb-1">Categories:</h1>
                <Row md="1" className="g-1 g-lg-2">
                  {categories.map((category) => (
                    <Col key={category._id}>
                      <Button
                        variant="dark"
                        size="md"
                        className={`w-100 border-0 px-3 rounded-2 fw-medium ${
                          selectedCategory === category.name
                            ? "bg-warning text-dark fw-semibold"
                            : ""
                        }`}
                        onClick={() => handleCategory(category.name)}
                      >
                        <i className={category.icon}></i>
                        <span className="ms-2 fs-7 fm-2">{category.name}</span>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col md="9" lg="10">
              <div
                className="search__product mt-2 mt-md-0 d-flex gap-2"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <Form method="get" className="w-100">
                  <div className="input-group fm-2">
                    <input
                      type="search"
                      className="form-control fs-6 border-2 border-end-0 border-secondary-subtle"
                      placeholder="Cari Furniture"
                      name="name"
                      defaultValue={name}
                    />
                    <button
                      type="submit"
                      className="border-2 border-start-0 border-secondary-subtle rounded-right input-group-text fw-semibold"
                    >
                      <i className="ri-search-line"></i>
                    </button>
                  </div>
                </Form>
                <Button
                  variant="light"
                  size="md"
                  className="btn__clear fm-2 fw-medium border-secondary-subtle border-2"
                  onClick={() => handleClear()}
                >
                  <i className="ri-filter-off-line"></i>
                </Button>
              </div>
              <div
                className="furniture__product mt-3 mt-md-2 mt-lg-4"
                style={{ minHeight: "100vh" }}
              >
                <Row xs="2" md="3" lg="4" className="g-2 g-lg-4">
                  {isPageLoading ? (
                    <Loading />
                  ) : !filteredProducts.length ? (
                    <h1 className="fw-semibold fs-5 fm-4 text-center w-100">
                      No Product Found
                    </h1>
                  ) : (
                    filteredProducts.map((product) => (
                      <Col key={product._id} data-aos="zoom-in">
                        <CardProductCustomer
                          product={product}
                          icons="ri-shopping-cart-2-line"
                        />
                      </Col>
                    ))
                  )}
                </Row>
              </div>
            </Col>
          </Row>
          <ul className="pagination pagination-sm justify-content-center mt-5">
            {pages.map((pageNumber) => (
              <li className="page-item" aria-current="page" key={pageNumber}>
                <button
                  className={`page-link ${pageNumber === page ? "active" : ""}`}
                  onClick={() => handleChangePage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};

export default ShopPage;
