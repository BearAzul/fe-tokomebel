import { toast } from "react-toastify";
import { redirect, useLoaderData, Link, useNavigate, useRevalidator } from "react-router-dom";
import BannerHeader from "../common/Banner/BannerHeader";
import { Container, Button, Row, Col, Image, ListGroup, Table } from "react-bootstrap";
import { formatToIDR, formatTanggalWaktu } from "../utils/index.jsx";
import customAPI from "../api.js";
import EmptyOrderIcon from "../assets/Image/empty_order.png";
import { useState, useEffect } from "react";
import NotAwailableImg from "../assets/Image/landscape-placeholder.svg";
import { HelmetHead } from "../common/Helmet.jsx"
import { generateInvoice } from "../utils/InvoiceGenerator.jsx";
import Swal from "sweetalert2";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

const breadcrumbItems = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profile" },
  { label: "Riwayat Pesanan" },
];

const insertSnapScript = () => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src*="snap.js"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", import.meta.env.VITE_CLIENT_MIDTRANS);
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan Login untuk akses halaman Riwayat Order");
    return redirect("/login");
  }
  const { data } = await customAPI.get("/order/current/user");

  const orders = data.data;
  return { orders };
};


const OrderHistory = () => {
  const { orders } = useLoaderData();
  const [records, setRecords] = useState(orders);
  const [loading, setLoading] = useState({});
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleRetryPayment = async (orderId) => {
    setLoading((prev) => ({ ...prev, [orderId]: true }));

    try {
      const response = await customAPI.post(`/order/${orderId}/retry-order`);
      const { token, message } = response.data;
      toast.info(message);

      window.snap.pay(token, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil!");
          revalidate();
          navigate(0);
        },
        onPending: () => toast.info("Menunggu pembayaran Anda."),
        onError: () => toast.error("Pembayaran gagal. Silakan coba lagi."),
        onClose: () => console.log("customer closed the popup without finishing the payment"),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan, gagal mencoba ulang pembayaran.");
    } finally {
      setLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleCancelOrder = async (orderId) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Aksi ini tidak bisa diurungkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, batalkan!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading((prev) => ({ ...prev, [orderId]: true }));
        try {
          await customAPI.delete(`/order/${orderId}/cancel`);
          toast.success("Pesanan berhasil dibatalkan.");
          revalidate();
        } catch (error) {
          toast.error(error.response?.data?.message || "Gagal membatalkan pesanan.");
        } finally {
          setLoading((prev) => ({ ...prev, [orderId]: false }));
        }
      }
    });
  };

  const handleSearch = (e) => {
    const newData = orders.filter((order) =>
      order.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.shipping.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  return (
    <>
      <HelmetHead
        title="Riwayat Pesanan"
        description="Lihat daftar riwayat pesanan Anda di Toko Mebel Amanah. Pantau status pengiriman dan detail transaksi dengan mudah."
        link="/orders"
      />
      <section id="history" className="bg-body-secondary">
        <BannerHeader bannerTitle="RIWAYAT PESANAN" />
        <Container className="py-3 py-md-5 fm-2">
          <Breadcrumbs items={breadcrumbItems} className="text-body-secondary" />
          <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
            <Link to="/profile" className="btn btn-primary btn-sm me-auto">
              <i className="ri-arrow-left-circle-line me-2"></i>
              Kembali
            </Link>
            <div className="input-group max-content input-group-sm ms-auto">
              <input
                type="search"
                placeholder="search"
                className="form-control"
                onChange={handleSearch}
              />
              <span className="input-group-text">
                <i className="ri-search-line"></i>
              </span>
            </div>
          </div>
          {!orders.length ? (
            <div className="fm-2 text-center order__history">
              <p>Anda belum melakukan pesanan apapun.</p>
              <hr />
              <img
                src={EmptyOrderIcon}
                alt="Empty Orders"
                className="d-block mx-auto w-75"
              />
            </div>
          ) : !records.length ? (
            <p className="text-center m-5">Pesanan Tidak Ditemukan.</p>
          ) : (
            <div className="">
              {records.map((order) => (
                <div className="p-3 border-3 border-start border-dark-green mt-3 bg-light shadow-sm" key={order._id}>
                  <div className="d-flex justify-content-between align-items-lg-center mb-2 flex-column flex-lg-row gap-2">
                    <h1 className="fs-7 d-flex align-items-center">
                      <i className="ri-circle-fill me-2 fs-8 text-dark-green"></i>
                      {formatTanggalWaktu(order.createdAt)}
                    </h1>
                    <p className="m-0">Status Pembayaran: <span className={`rounded ${order.status === "success" ? "text-bg-success" : "text-bg-warning"}  fs-7 py-1 px-2 fw-semibold`}>{order.status}</span></p>
                  </div>
                  <Row lg="2" md="2" xs="1" className="g-3">
                    <Col md="6" lg="8">
                      <ListGroup>
                        {order.itemsDetail.map((item) => (
                          <ListGroup.Item className="shadow-sm" key={item.product}>
                            <div className="d-flex gap-3 py-2">
                              <Image src={!item.image ? NotAwailableImg : item.image} style={{ width: "6rem", height: "6rem" }} className="object-fit-cover d-block rounded" alt={item.name} />
                              <div className="d-flex flex-column gap-2">
                                <h1 className="fs-6 fw-medium">{item.name}</h1>
                                <span className="rounded py-1 px-2 text-bg-warning max-content fs-7 text-capitalize">
                                  {item.category}
                                </span>
                                <p className="m-0 fs-6">{formatToIDR(item.price)} x{item.quantity}</p>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col md="6" lg="4">
                      <Table className="fs-7" size="sm" borderless variant="light">
                        <tbody>
                          <tr>
                            <td>ID Pesanan</td>
                            <td>:</td>
                            <td>#{order._id}</td>
                          </tr>
                          <tr>
                            <td>Ongkir</td>
                            <td>:</td>
                            <td>Gratis</td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>:</td>
                            <td>{formatToIDR(order.total)}</td>
                          </tr>
                          <tr>
                            <td>Pengiriman</td>
                            <td>:</td>
                            {order.status === "pending" && order.shipping === "shipping" && (
                              <td className="text-bg-secondary rounded text-center fw-medium">
                                Belum Bayar
                              </td>
                            )}
                            {order.status === "success" && order.shipping === "shipping" && (
                              <td className="text-bg-warning rounded text-center fw-medium">
                                Dalam Perjalanan
                              </td>
                            )}
                            {order.status === "success" && order.shipping === "delivered" && (
                              <td className="text-bg-success rounded text-center fw-medium">
                                Terkirim
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </Table>
                      <Link to={`/orders/${order._id}/shipping`} className="btn btn-outline-success btn-sm w-100 mb-3"> Lihat Detail Pesanan </Link>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        {order.status === "success" && (
                          <Button variant="base" size="sm" className="text-success w-100" onClick={() => generateInvoice(order)}>
                            Get Invoice
                          </Button>
                        )}
                        {(order.status === "pending" || order.status === "failed") && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={loading[order._id]}
                          >
                            {loading[order._id] ? '...' : 'Batalkan'}
                          </Button>
                        )}
                        {order.status === "pending" && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="text-nowrap w-100"
                            onClick={() => handleRetryPayment(order._id)}
                            disabled={loading[order._id]}
                          >
                            {loading[order._id] ? 'Loading...' : 'Lanjut Bayar'}
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default OrderHistory;
