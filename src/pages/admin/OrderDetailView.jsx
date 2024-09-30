import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import customAPI from "../../api.js";
import DataTable from "react-data-table-component";
import { formatToIDR } from "../../utils";

const OrderDetailView = () => {
  const [detailOrder, setDetailOrder] = useState([]);
  const { id } = useParams();

  const getDetailOrder = async (id) => {
    const { data } = await customAPI.get(`/order/${id}`);
    setDetailOrder(data.data);
  };

  useEffect(() => {
    getDetailOrder(id);
  }, []);

  const columns = [
    {
      name: "Product",
      selector: (row) => (
        <div className="d-inline-flex gap-2 p-2 fm-2">
          <figure
            style={{ width: "50px", height: "50px" }}
            className="overflow-hidden rounded bg-white"
          >
            <img
              src={row.image}
              alt={row.name}
              className="d-block w-100 h-100"
            />
          </figure>
          <article>
            <p className="fw-semibold mb-1">{row.name}</p>
            <p className="text-bg-warning fs-7 py-1 px-2 rounded max-content fw-medium">
              {row.category}
            </p>
          </article>
        </div>
      ),
      width: "180px",
    },
    {
      name: "Qty",
      selector: (row) => `x${row.quantity}`,
      center: true,
    },
    {
      name: "Price",
      selector: (row) => formatToIDR(row.price),
      width: "150px",
    },
    {
      name: "Total",
      selector: (row) => formatToIDR(row.quantity * row.price),
      width: "150px",
    },
  ];

  return (
    <section className="fm-2">
      <Container>
        <div className="d-flex justify-content-between mb-3 align-items-center gap-3 flex-column-reverse flex-md-row">
          <h6>
            Order ID: <span className="text-warning">#{detailOrder._id}</span>
          </h6>
          <Link to="/admin/orders" className="btn btn-primary btn-sm me-auto me-md-0">
            <i className="ri-arrow-left-circle-line me-2"></i>
            Back
          </Link>
        </div>
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
                  Customer Detail
                </Card.Title>

                <Table responsive className="table-dark">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td className="text-end">{`${detailOrder.firstName} ${detailOrder.lastName} `}</td>
                    </tr>
                    <tr>
                      <td>No.Telp</td>
                      <td className="text-end">{detailOrder.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td className="text-end">{detailOrder.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="text-bg-dark border border-secondary mb-3">
              <Card.Body className="d-flex gap-3">
                <figure
                  style={{ width: "80px", height: "80px" }}
                  className="overflow-hidden rounded border border-secondary m-0"
                >
                  <img
                    src={`${
                      detailOrder.image === null
                        ? "https://via.placeholder.com/300x300"
                        : detailOrder.image
                    }`}
                    alt={detailOrder.firstName}
                    className="d-block w-100 h-100 object-fit-cover"
                  />
                </figure>
                <div>
                  <h6 className="mb-3">{`${detailOrder.firstName} ${detailOrder.lastName} `}</h6>
                  <span
                    className={`rounded py-1 px-2 ${
                      detailOrder.status === "success"
                        ? "text-bg-success"
                        : detailOrder.status === "failed"
                        ? "text-bg-danger"
                        : "text-bg-warning"
                    }`}
                  >
                    {detailOrder.status}
                  </span>
                </div>
              </Card.Body>
            </Card>
            <Card className="border border-secondary text-bg-dark mb-3">
              <Card.Body>
                <Card.Title className="border-bottom border-secondary pb-2">
                  Order Summary
                </Card.Title>
                <table className="w-100">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>:</td>
                      <td className="text-end">
                        {formatToIDR(detailOrder.total)}
                      </td>
                    </tr>
                    <tr>
                      <td>Delivery Fee</td>
                      <td>:</td>
                      <td className="text-end">{formatToIDR(120000)}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>:</td>
                      <td className="text-end">
                        {formatToIDR(detailOrder.total + 120000)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
            <Card className="border border-secondary text-bg-dark">
              <Card.Body>
                <Card.Title className="border-bottom pb-2 border-secondary">
                  Delivery Address
                </Card.Title>
                <p>{detailOrder.city}</p>
                <p>{detailOrder.address}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OrderDetailView;
