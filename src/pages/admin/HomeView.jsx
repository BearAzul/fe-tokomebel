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
import { HelmetHead } from "../../common/Helmet.jsx";
import { formatToIDR } from "../../utils/index.jsx";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user || user.role !== 'owner') {
    toast.error("Hanya owner yang bisa mengakses dashboard.");
    return redirect("/admin/orders");
  }

  try {
    const { data: statsData } = await customAPI.get("/order/stats/summary");
    const { data: ordersData } = await customAPI.get("/order");

    return {
      stats: statsData.data,
      orders: ordersData.data,
    };
  } catch (error) {
    console.error("Gagal memuat data dashboard", error);
    return { stats: null, orders: [] };
  }
};

const HomeView = () => {
  const { stats, orders } =
    useLoaderData();

  if (!stats) {
    return <p className="text-center p-5">Gagal memuat data dashboard.</p>;
  }

  const CardData = [
    {
      path: "/admin/orders",
      title: "Total Pesanan",
      count: stats.totalOrders,
      iconClass: "ri-shopping-cart-fill",
      bgClass: "text-bg-warning",
    },
    {
      path: "/admin/customers",
      title: "Total Pelanggan",
      count: stats.totalUniqueCustomers,
      iconClass: "ri-user-3-fill",
      bgClass: "text-bg-success",
    },
    {
      title: "Pesanan Sukses",
      count: stats.orderStatusCounts.find(s => s._id === 'success')?.count || 0,
      iconClass: "ri-check-double-line",
      bgClass: "text-bg-primary",
    },
    {
      title: "Pesanan Gagal",
      count: stats.orderStatusCounts.find(s => s._id === 'failed')?.count || 0,
      iconClass: "ri-close-circle-line",
      bgClass: "text-bg-danger",
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
    <>
      <HelmetHead title="Dashboard" />
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
              <h6 className="mb-1">Total Uang Masuk</h6>
              <p className="fs-6 fw-bold">
                {formatToIDR(stats.totalRevenue)}
              </p>
            </div>
          </div>
          <Row md="2" xs="1" lg="4" className="g-3 g-lg-2">
            {CardData.map((card, index) => (
              <Col key={index}>
                <div className="d-flex align-items-start gap-3 gap p-3 rounded border border-secondary shadow-md">
                  <Link
                    to={card.path || "#"}
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
                <h6 className="mb-3">Banyaknya Pesanan</h6>
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
                <h6 className="mb-3">Terjual Berdasarkan Kategori</h6>
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
    </>
  );
};

export default HomeView;
