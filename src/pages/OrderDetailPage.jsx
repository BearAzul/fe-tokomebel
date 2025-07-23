import { HelmetHead } from "../common/Helmet.jsx";
import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { Container, Card, ProgressBar, Form, Row, Col, ListGroup, Image, Table } from "react-bootstrap";
import { formatToIDR, formatTanggalWaktu } from "../utils/index.jsx";
import NotAwailableImg from "../assets/Image/landscape-placeholder.svg";
import { useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customAPI from "../api.js";
import Loading from "../components/Loading.jsx";
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export const loader = (storage) => async ({ params }) => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan Login untuk melihat detail pesanan");
    return redirect("/login");
  }
  try {
    const { data } = await customAPI.get(`/order/${params.id}/current/user`);
    return { order: data.data };
  } catch (error) {
    toast.error("Gagal memuat detail pesanan.");
    return redirect("/orders");
  }
};


const OrderDetailPage = () => {
  const { order } = useLoaderData();
  const [progress, setProgress] = useState(0);
  const [statusSteps, setStatusSteps] = useState({
    confirmed: false,
    shipping: false,
    delivered: false,
  });

  const breadcrumbItems = [
    { label: "Beranda", path: "/" },
    { label: "Profil", path: "/profile" },
    { label: "Riwayat Pesanan", path: "/orders" },
    { label: "Detail Pesanan" },
  ];

  useEffect(() => {
    if (order) {
      let currentProgress = 0;
      let steps = { confirmed: false, shipping: false, delivered: false };

      if (order.status === "pending" && order.shipping === "pending") {
        currentProgress = 0
      }

      if (order.status === 'success' && order.shipping === 'shipping') {
        currentProgress = 50;
        steps.confirmed = true;
        steps.shipping = true;
      }
      if (order.status === 'success' && order.shipping === 'delivered') {
        currentProgress = 100;
        steps.confirmed = true;
        steps.shipping = true;
        steps.delivered = true;
      }

      setProgress(currentProgress);
      setStatusSteps(steps);
    }
  }, [order]);

  if (!order) return <Loading />

  const getStatusClass = (isActive) => isActive ? 'text-bg-success' : 'text-bg-secondary';

  const iconsStatus = (isActive) => isActive ? "ri-checkbox-circle-line" : "ri-error-warning-line"

  return (
    <>
      <HelmetHead title={`Detail Pesanan #${order._id}`} />
      <section id="detailPesananUser" className="bg-body-secondary">
        <BannerHeader bannerTitle="DETAIL PESANAN" />
        <Container className="py-3 py-md-5 fm-2">
          <Breadcrumbs items={breadcrumbItems} className="text-body-secondary" /> 

          <Card className="p-3 bg-light">
            <h1 className="fs-6 fw-medium mb-1 text-wrap">Detail Pesanan: #{order._id}</h1>
            <p className="fs-7 text-secondary">Tanggal: {formatTanggalWaktu(order.createdAt)}</p>

            <div className="progress-container position-relative mt-4 mb-5 mb-md-4">
              <ProgressBar now={progress} variant="success" />

              <div id="confirm" className="position-absolute" style={{ top: "180%", transform: "translateY(-50%)" }}>
                <span className={`d-flex align-items-center justify-content-center rounded-circle ${getStatusClass(statusSteps.confirmed)}`} style={{ width: "1.5rem", height: "1.5rem" }}>
                  <i className={`${iconsStatus(statusSteps.confirmed)} fs-5`}></i>
                </span>
                <div className="mt-2 text-start">
                  <h1 className="fs-7 fw-semibold">Konfirmasi</h1>
                  <p className="fs-7 text-secondary">{formatTanggalWaktu(order.createdAt)}</p>
                </div>
              </div>

              <div id="shipping" className="position-absolute d-flex flex-column align-items-center justify-content-center" style={{ top: "180%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <span className={`d-flex align-items-center justify-content-center rounded-circle ${getStatusClass(statusSteps.shipping)}`} style={{ width: "1.5rem", height: "1.5rem" }}>
                  <i className={`${iconsStatus(statusSteps.shipping)} fs-5`}></i>
                </span>
                <div className="mt-2 text-center">
                  <h1 className="fs-7 fw-semibold">Pengiriman</h1>
                  <p className="fs-7 text-secondary">Dikirim Menggunakan Pickup</p>
                </div>
              </div>
              
              <div id="delivered" className="position-absolute d-flex flex-column align-items-end justify-content-center" style={{ top: "180%", right: "0", transform: "translateY(-50%)" }}>
                <span className={`d-flex align-items-center justify-content-center rounded-circle ${getStatusClass(statusSteps.delivered)}`} style={{ width: "1.5rem", height: "1.5rem" }}>
                  <i className={`${iconsStatus(statusSteps.delivered)} fs-5`}></i>
                </span>
                <div className="mt-2 text-end">
                  <h1 className="fs-7 fw-semibold">Terkirim</h1>
                  <p className="fs-7 text-secondary">Mebel Telah Sampai</p>
                </div>
              </div>
            </div>

            <Card.Body className="mt-5 p-0">
              <Row md="2" xs="1" className="g-2">
                <Col>
                  <Form.Label htmlFor="fullName" className="fs-6">Nama Lengkap:</Form.Label>
                  <Form.Control id="fullName" size="sm" type="text" defaultValue={`${order.firstName} ${order.lastName}`} readOnly />
                </Col>
                <Col>
                  <Form.Label htmlFor="email">Email:</Form.Label>
                  <Form.Control id="email" size="sm" type="text" defaultValue={order.email} readOnly />
                </Col>
                <Col>
                  <Form.Label htmlFor="phone">No. Telepon:</Form.Label>
                  <Form.Control id="phone" size="sm" type="text" defaultValue={order.phone} readOnly />
                </Col>
                <Col>
                  <Form.Label htmlFor="city">Kabupaten/Kota:</Form.Label>
                  <Form.Control id="city" size="sm" type="text" defaultValue={order.city} readOnly />
                </Col>
                <Col md="12">
                  <Form.Label htmlFor="address">Alamat Lengkap:</Form.Label>
                  <Form.Control id="address" size="sm" as="textarea" defaultValue={order.address} readOnly />
                </Col>
              </Row>

              <h2 className="fs-6 my-2 fw-normal">Item Pesanan:</h2>
              <Row lg="2" md="2" xs="1" className="g-3">
                <Col md="6" lg="6">
                  <ListGroup>
                    {order.itemsDetail.map(item => (
                      <ListGroup.Item key={item._id} className="shadow-sm">
                        <div className="d-flex gap-3 py-2">
                          <Image src={item.image || NotAwailableImg} style={{ width: "6rem", height: "6rem" }} className="object-fit-cover d-block rounded" alt={item.name} />
                          <div className="d-flex flex-column gap-2">
                            <h1 className="fs-6 fw-medium">{item.name}</h1>
                            <span className="rounded py-1 px-2 text-bg-warning max-content fs-7 text-capitalize">{item.category}</span>
                            <p className="m-0 fs-6">{formatToIDR(item.price)} x{item.quantity}</p>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md="6" lg="6">
                  <Table size="sm" borderless variant="light">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td>:</td>
                        <td>{formatToIDR(order.total)}</td>
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
                        <td>Pembayaran</td>
                        <td>:</td>
                        <td>
                          <span className={`px-2 py-1 rounded ${order.status === "success" ? "text-bg-success" : "text-bg-warning"}`}>{order.status === "success" ? "Berhasil" : "Menunggu Pembayaran"}</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </>
  )
}

export default OrderDetailPage;