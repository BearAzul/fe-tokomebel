import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import BannerHeader from "../common/Banner/BannerHeader";
import { Container } from "react-bootstrap";
import { formatToIDR } from "../utils";
import customAPI from "../api";

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

  if (!orders.length) {
    return (
      <div className="py-5">
        <Container>
          <h1>Riwayat Order</h1>
          <p>Belum ada order yang diterima.</p>
        </Container>
      </div>
    );
  }

  return (
    <section id="history">
      <BannerHeader bannerTitle="Order History" />
      <Container className="py-3 py-md-5">
        <div className="table-responsive">
          <table className="table table-bordered table-striped-columns table-dark text-center fm-2 table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Order List</th>
                <th>Total</th>
                <th>Status Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="text-start">
                    <ul className="list-group list-group-flush">
                      {order.itemsDetail.map((itemProduct) => (
                        <li
                          className="list-group-item d-flex"
                          key={itemProduct.product}
                        >
                          <img
                            src={itemProduct.image}
                            alt={itemProduct.name}
                            className="d-block"
                            style={{ width: "70px", height: "70px" }}
                          />

                          <div>
                            <h6>
                              <b>{itemProduct.name}</b> - {itemProduct.category}
                            </h6>
                            <p>
                              {formatToIDR(itemProduct.price)} x
                              {itemProduct.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{formatToIDR(order.total)}</td>
                  <td>
                    {order.status === "pending" ? (
                      <span className="btn btn-info btn-sm">Pending</span>
                    ) : order.status === "success" ? (
                      <span className="btn btn-success btn-sm">Success</span>
                    ) : (
                      <span className="btn btn-danger btn-sm">Failed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default OrderHistory;
