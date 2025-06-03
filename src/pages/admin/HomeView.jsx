import { Row, Col, Container } from "react-bootstrap";
import customAPI from "../../api.js";
import { useLoaderData, Link } from "react-router-dom";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const loader = async () => {
  const [resProducts, resOrders, resUsers, resCategory] = await Promise.all([
    customAPI.get("/product"),
    customAPI.get("/order"),
    customAPI.get("/auth/users"),
    customAPI.get("/category"),
  ]);

  const countProducts = resProducts.data.pagination.totalProduct;
  const countOrders = resOrders.data.count;
  const countUsers = resUsers.data.count;
  const countCategory = resCategory.data.count;

  const orders = resOrders.data.data;

  const totalEarnings = orders.reduce((acc, order) => acc + order.total, 0);

  return {
    countProducts,
    countOrders,
    countUsers,
    countCategory,
    orders,
    totalEarnings
  };
};

const HomeView = () => {
  const { countProducts, countOrders, countUsers, countCategory, orders, totalEarnings } =
    useLoaderData();

  const CardData = [
    {
      path: "/admin/category",
      title: "Total Categories",
      count: countCategory,
      iconClass: "ri-folder-open-fill",
      bgClass: "text-bg-danger",
    },
    {
      path: "/admin/products",
      title: "Total Products",
      count: countProducts,
      iconClass: "ri-shopping-bag-fill",
      bgClass: "text-bg-primary",
    },
    {
      path: "/admin/orders",
      title: "Total Orders",
      count: countOrders,
      iconClass: "ri-shopping-cart-fill",
      bgClass: "text-bg-warning",
    },
    {
      path: "/admin/customers",
      title: "Total Customers",
      count: countUsers,
      iconClass: "ri-user-3-fill",
      bgClass: "text-bg-success",
    },
  ];

  // LineChart: Order per tannggal
  const orderPerDate = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      map[date] = (map[date] || 0) + 1;
    });
    return Object.entries(map).map(([date, TotalOrder]) => ({
      date,
      TotalOrder,
    }));
  }, [orders]);

  // PieChart: Produk per kategori
  const soldByCategory = useMemo(() => {
    const categoryCount = {};

    orders.forEach((order) => {
      order.itemsDetail.forEach((item) => {
        const category = item.category;
        categoryCount[category] =
          (categoryCount[category] || 0) + item.quantity;
      });
    });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [orders]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B25DFF"];

  return (
    <section id="dashboard" className="p-2 fm-2">
      <Container>
        <div className="d-flex align-items-start gap-3 p-3 rounded border border-secondary shadow-md mb-3">
          <div
            className="flex-shrink-0 bg-secondary text-decoration-none rounded d-flex align-items-center justify-content-center"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="ri-wallet-3-line fs-4 text-white"></i>
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-1">Total Earnings</h6>
            <p className="fs-6 fw-bold">
              Rp. {totalEarnings.toLocaleString("id-ID")},00
            </p>
          </div>
        </div>
        <Row md="2" xs="1" lg="4" className="g-3 g-lg-2">
          {CardData.map((card, index) => (
            <Col key={index}>
              <div className="d-flex align-items-start gap-3 gap p-3 rounded border border-secondary shadow-md">
                <Link
                  to={card.path}
                  className={`flex-shrink-0 ${card.bgClass} text-decoration-none rounded d-flex align-items-center justify-content-center`}
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className={`${card.iconClass} fs-4 text-white`}></i>
                </Link>
                <div className="flex-grow-1">
                  <h6 className="mb-1">{card.title}</h6>
                  <p className="fs-6 fw-bold">{card.count}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mt-1 g-3">
          <Col lg={8} xs={12}>
            <div className="p-3 border rounded shadow-sm h-100 border-secondary ">
              <h6 className="mb-3">Orders by Date</h6>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={orderPerDate}>
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="TotalOrder"
                    stroke="#FE5D26"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col lg={4} xs={12}>
            <div className="p-3 border rounded shadow-sm h-100 border-secondary ">
              <h6 className="mb-3">Sold by Category</h6>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={300}>
                  <Pie
                    data={soldByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {soldByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeView;
