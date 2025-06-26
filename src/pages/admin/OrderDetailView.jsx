import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useRevalidator, useNavigate } from "react-router-dom";
import customAPI from "../../api.js";
import DataTable from "react-data-table-component";
import { formatToIDR } from "../../utils";
import { DetailOrderDirect } from "../../components/Directlink.jsx";
import BlankImages from "../../assets/Image/blank_user.png"
import { HelmetHead } from "../../common/Helmet.jsx";
import Loading from "../../components/Loading.jsx";
import { formatTanggalWaktu } from "../../utils/index.jsx";
import ZoomModal from "../../components/ZoomModal.jsx";
import { toast } from "react-toastify"

const OrderDetailView = () => {
  const user = useSelector((state) => state.userState.user);
  const [showZoom, setShowZoom] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const navigate = useNavigate()
  const { id } = useParams();
  const { revalidate } = useRevalidator();

  const handleZoomIn = (url) => setShowZoom(url);
  const handleZoomOut = () => setShowZoom(null);

  const getDetailOrder = async (id) => {
    const { data } = await customAPI.get(`/order/${id}`);
    setDetailOrder(data.data);
  };


  const handleUpdateShipping = async () => {
    try {
      await customAPI.put(`/order/${id}/shipping`);
      toast.success("Status pengiriman berhasil diubah!");
      navigate(0)
      revalidate();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update status.");
    }
  };

  const getShippingStatusInfo = (shippingStatus) => {
    if (shippingStatus === "delivered") {
      return { text: "Sudah Sampai", color: "success" };
    }
    return { text: "Dalam Perjalanan", color: "warning" };
  };

  if (!detailOrder) {
    return <Loading />;
  }

  let delivery = 80000;
  const columns = [
    {
      name: "Produk Mebel",
      selector: (row) => (
        <div className="p-2 fm-2">
          <h1 className="fw-semibold fs-7 my-2">{row.name}</h1>
          <div className="d-inline-flex gap-2 ">
            <figure
              style={{ width: "50px", height: "50px" }}
              className="overflow-hidden rounded bg-white"
              onClick={() => handleZoomIn(row.image)}
            >
              <img
                src={row.image}
                alt={row.name}
                className="d-block w-100 h-100"
              />
            </figure>
            <article>

              <p className="text-bg-warning fs-7 py-1 px-2 rounded max-content fw-medium">
                {row.category}
              </p>
            </article>
          </div>
        </div>
      ),
      width: "250px",
    },
    {
      name: "Qty",
      selector: (row) => `x${row.quantity}`,
      center: true,
    },
    {
      name: "Harga",
      selector: (row) => formatToIDR(row.price),
      width: "150px",
    },
    {
      name: "Total",
      selector: (row) => formatToIDR(row.quantity * row.price),
      width: "150px",
    },
  ];

  const shippingStatusInfo = getShippingStatusInfo(detailOrder.shipping);

  useEffect(() => {
    getDetailOrder(id);
  }, []);

  return (
    <>
      <HelmetHead title="Dashboard" />
      <section className="fm-2">
        <Container>
          <DetailOrderDirect />
          <h6 className="mb-2">
            ID Pesanan: <span className="text-warning">#{detailOrder._id}</span>
          </h6>
          <Row lg="2" className="g-3">
            <Col lg="8">
              <DataTable
                data={detailOrder.itemsDetail}
                columns={columns}
                theme="dark"
                className="rounded border border-secondary mb-3"
              />
              <Card className="border border-secondary text-bg-dark">
                <Card.Body>
                  <Card.Title className="border-bottom pb-2 border-secondary">
                    Detail Pelanggan
                  </Card.Title>

                  <Table responsive className="table-dark">
                    <tbody>
                      <tr>
                        <td>Nama Lengkap</td>
                        <td>:</td>
                        <td className="text-end">{`${detailOrder.firstName} ${detailOrder.lastName} `}</td>
                      </tr>
                      <tr>
                        <td>No.Telp</td>
                        <td>:</td>
                        <td className="text-end">{detailOrder.phone}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td className="text-end">{detailOrder.email}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="text-bg-dark border border-secondary mb-3">
                <Card.Body>
                  <Card.Title className="border-bottom border-secondary pb-2">
                    Status Pembayaran
                  </Card.Title>
                  <div className="d-flex gap-3">
                    <figure
                      style={{ width: "80px", height: "80px" }}
                      className="overflow-hidden rounded border border-secondary m-0"
                      onClick={() => handleZoomIn(detailOrder.image)}
                    >
                      <img
                        src={`${detailOrder.image === null
                          ? BlankImages
                          : detailOrder.image
                          }`}
                        alt={detailOrder.firstName}
                        className="d-block w-100 h-100 object-fit-cover"
                      />
                    </figure>
                    <div>
                      <h6 className="mb-3">{`${detailOrder.firstName} ${detailOrder.lastName} `}</h6>
                      <span
                        className={`rounded py-1 px-2 ${detailOrder.status === "success"
                          ? "text-bg-success"
                          : detailOrder.status === "failed"
                            ? "text-bg-danger"
                            : "text-bg-warning"
                          }`}
                      >
                        {detailOrder.status}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="border border-secondary text-bg-dark mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2">
                    <h1 className="fs-5">Ringkasan</h1>
                    <span className={`text-bg-${shippingStatusInfo.color} fs-7 px-2 py-1 rounded ms-2`}>
                      {shippingStatusInfo.text}
                    </span>
                  </div>
                  {user.role === "courier" && detailOrder.status === "success" && detailOrder.shipping === "shipping" && (
                    <Card className="border border-secondary text-bg-dark mb-3">
                      <Card.Body>
                        <Card.Title className="border-bottom fs-6 pb-2 border-secondary">
                          Aksi Kurir
                        </Card.Title>
                        <Button variant="primary" size="sm" className="w-100" onClick={handleUpdateShipping}>
                          Tandai Sudah Sampai
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                  <table className="w-100 fs-7">
                    <tbody>
                      <tr>
                        <td>Pesanan Dibuat</td>
                        <td>:</td>
                        <td className="text-end">
                          {formatTanggalWaktu(detailOrder.createdAt)}
                        </td>
                      </tr>
                      <tr>
                        <td>Subtotal</td>
                        <td>:</td>
                        <td className="text-end">
                          {formatToIDR(detailOrder.total - delivery)}
                        </td>
                      </tr>
                      <tr>
                        <td>Ongkos Kirim</td>
                        <td>:</td>
                        <td className="text-end">{formatToIDR(delivery)}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>:</td>
                        <td className="text-end">
                          {formatToIDR(detailOrder.total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className="border border-secondary text-bg-dark">
                <Card.Body>
                  <Card.Title className="border-bottom pb-2 border-secondary">
                    Alamat Pelanggan
                  </Card.Title>
                  <p>{detailOrder.city}</p>
                  <p>{detailOrder.address}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <ZoomModal
            show={showZoom}
            onHide={handleZoomOut}
            imageUrl={showZoom}
            altText="Detail Gambar"
          />
        </Container>
      </section>
    </>
  );
};

export default OrderDetailView;
