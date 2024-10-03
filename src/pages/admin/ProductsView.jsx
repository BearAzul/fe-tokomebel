import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLoaderData, useNavigation, Form, useNavigate } from "react-router-dom";
import customAPI from "../../api.js";
import { CardProductAdmin } from "../../components/CardProduct.jsx";
import Loading from "../../components/Loading.jsx";
import "../../styles/index.css";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });
  const resCategory = await customAPI.get("/category");
  const dataProducts = data.data;
  const pagination = data.pagination;
  const categories = resCategory.data.data

  return { dataProducts, params, pagination, categories};
};

const ProductsView = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { dataProducts, params } = useLoaderData();
  const {categories} = useLoaderData([]);
  const { name } = params;

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const filterProducts = () => {
    const filtered = dataProducts.filter((product) =>
      selectedCategory ? product.category.name === selectedCategory : true
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [dataProducts, selectedCategory]);

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClear = () => {
    setSelectedCategory("");
    navigate("/admin/products");
  };

  return (
    <section id="product" className="fm-2">
      <Container>
        <h5 className="fm-2 mb-3">Products</h5>
        <div className="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row gap-3 gap-md-0 mb-3">
          <Link to="/admin/products/add" className="btn btn-success btn-sm" >
            <i className="ri-add-circle-line me-1"></i>
            Add New Product
          </Link>
          <Form
            method="get"
            className="d-flex align-items-center gap-2 flex-wrap flex-md-nowrap"
          >
            <div className="d-flex w-100 gap-1 align-items-center">
              <Button variant="light" size="sm" onClick={handleClear}>
                <i className="ri-filter-off-line"></i>
              </Button>
              <select name="category" className="form-select form-select-sm fs-7" onChange={handleCategory}>
                <option value="">-- Choose Category --</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>  
            <div className="input-group">
              <input
                name="name"
                type="search"
                placeholder="search"
                defaultValue={name}
                className="form-control form-control-sm"
              />
              <button type="submit" className="btn btn-warning btn-sm">
                <i className="ri-search-line"></i>
              </button>
            </div>
          </Form>
        </div>
        <div className="mt-4 furniture__product">
          <Row lg="5" md="4" xs="2" className="g-2 g-lg-3">
            {isPageLoading ? (
              <Loading />
            ) : !filteredProducts.length ? (
              <h1 className="fw-semibold fs-5 fm-4 text-center w-100">
                No Product Found
              </h1>
            ) : (
              filteredProducts.map((product) => (
                <Col key={product._id}>
                  <CardProductAdmin
                    product={product}
                    icons="ri-edit-circle-fill"
                    className="text-white"
                  />
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ProductsView;
