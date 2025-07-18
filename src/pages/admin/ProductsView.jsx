import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigation,
  Form,
  useNavigate,
} from "react-router-dom";
import customAPI from "../../api.js";
import { CardProductAdmin } from "../../components/CardProduct.jsx";
import Loading from "../../components/Loading.jsx";
import { ProductsDirect } from "../../components/Directlink.jsx";
import CustomPagination from "../../components/Pagination.jsx";
import "../../styles/index.css";
import { HelmetHead } from "../../common/Helmet.jsx";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product?limit=8", { params: params });
  const resCategory = await customAPI.get("/category");
  const dataProducts = data.data;
  const pagination = data.pagination;
  const categories = resCategory.data.data;

  return { dataProducts, params, pagination, categories };
};

const ProductsView = () => {
  const navigate = useNavigate();
  const { dataProducts, params, categories, pagination } = useLoaderData();
  const { search, pathname } = useLocation();
  const { name, category } = params;
  const { page, totalPage } = pagination;

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const handleChangePage = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handleClear = () => {
    navigate("/admin/products");
  };

  return (
    <>
      <HelmetHead title="Produk Mebel" />
      <section id="product" className="fm-2">
        <Container>
          <ProductsDirect />
          <h5 className="fm-2 mb-3">Daftar Produk Mebel</h5>
          <div className="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row gap-3 gap-md-0 mb-3">
            <Link to="/admin/products/add" className="btn btn-success btn-sm">
              <i className="ri-add-circle-line me-1"></i>
              Tambah Mebel Baru
            </Link>
            <Form
              method="get"
              className="d-flex align-items-center gap-2 flex-wrap flex-md-nowrap"
            >
              <div className="d-flex w-100 gap-1 align-items-center">
                <Button variant="light" size="sm" onClick={handleClear}>
                  <i className="ri-filter-off-line"></i>
                </Button>
                <select
                  name="category"
                  className="form-select fs-7"
                  defaultValue={category}
                >
                  <option value="">-- Cari Kategori --</option>
                  {categories.map((tag) => (
                    <option key={tag._id} value={tag.name}>
                      {tag.name}
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
            <Row lg="4" md="4" xs="2" className="g-2 g-lg-3">
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
            <CustomPagination
              totalPage={totalPage}
              currentPage={page}
              onChangePage={handleChangePage}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductsView;
