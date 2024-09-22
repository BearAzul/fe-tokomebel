import { Container, Row, Col } from "react-bootstrap";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import customAPI from "../../api.js";
import { CardProductAdmin } from "../../components/CardProduct.jsx";
import Categories from "../../assets/data/Category.jsx";
import Loading from "../../components/Loading.jsx";
import "../../styles/index.css"

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });
  const dataProducts = data.data;
  const pagination = data.pagination;

  return { dataProducts, params, pagination };
};

const ProductsView = () => {
  const { dataProducts } = useLoaderData();

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <section id="product" className="fm-2">
      <Container>
        <h5 className="fm-2 mb-3">Products</h5>
        <div className="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row gap-3 gap-md-0 mb-3">
          <Link to="/admin/products/add" className="btn btn-success btn-sm">
            <i className="ri-add-circle-line me-1"></i>
            Add New Product
          </Link>
          <div className="d-flex align-items-center gap-1 justify-content-center flex-column flex-md-row">
            <select
              name="category"
              id="category"
              className="form-select form-select-sm w-100"
            >
              <option selected disabled>
                -- Choose Category --
              </option>
              {Categories.map((category, index) => (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <div className="input-group">
              <input
                name="search"
                type="search"
                placeholder="search"
                className="form-control form-control-sm"
              />
              <button className="btn btn-warning btn-sm" type="button">
                <i className="ri-search-line"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 furniture__product">
          <Row lg="5" md="4" xs="2" className="g-2 g-lg-3">
            {isPageLoading ? (
              <Loading />
            ) : !dataProducts.length ? (
              <h1 className="fw-semibold fs-5 fm-4 text-center w-100">
                No Product Found
              </h1>
            ) : (
              dataProducts.map((product) => (
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
