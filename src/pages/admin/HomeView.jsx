import { Row, Col, Container } from "react-bootstrap";
import customAPI from "../../api.js";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const resProducts = await customAPI.get("/product");
  const resOrders = await customAPI.get("/order");
  const resUsers = await customAPI.get("/auth/users");

  const countProducts = resProducts.data.pagination.totalProduct;
  const countOrders = resOrders.data.count;
  const countUsers = resUsers.data.count;

  console.log(countProducts);
  return { countProducts, countOrders, countUsers };
};

const HomeView = () => {
  const { countProducts, countOrders, countUsers } = useLoaderData();

  const CardData = [
    {
      path: "/admin/products",
      title: "Products",
      count: countProducts,
      iconClass: "ri-shopping-bag-fill",
      bgClass: "text-bg-primary",
    },
    {
      path: "/admin/orders",
      title: "Orders",
      count: countOrders,
      iconClass: "ri-shopping-cart-fill",
      bgClass: "text-bg-warning",
    },
    {
      path: "/admin/customers",
      title: "Customers",
      count: countUsers,
      iconClass: "ri-user-3-fill",
      bgClass: "text-bg-success",
    },
    {
      path: "/admin/reports",
      title: "Reports",
      count: 0,
      iconClass: "ri-folder-chart-fill",
      bgClass: "text-bg-info",
    },
  ];

  return (
    <section id="dashboard" className="p-2 fm-2">
      <Container>
        <Row md="3" lg="4" xs="2" className="g-lg-4 g-2">
          {CardData.map((card, index) => (
            <Col key={index}>
              <div className="d-flex align-items-start gap-2 gap-md-3 p-3 border rounded border border-secondary shadow-md flex-column flex-md-row">
                <Link to={card.path}
                  className={`flex-shrink-0 ${card.bgClass} text-decoration-none rounded d-flex align-items-center justify-content-center`}
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className={`${card.iconClass} fs-4 text-white`}></i>
                </Link>
                <div className="flex-grow-1">
                  <h5 className="mb-1">{card.title}</h5>
                  <p className="fs-6 fw-bold">{card.count}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HomeView;
