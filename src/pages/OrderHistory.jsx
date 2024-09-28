import { toast } from "react-toastify";
import { redirect, useLoaderData, Link } from "react-router-dom";
import BannerHeader from "../common/Banner/BannerHeader";
import { Container } from "react-bootstrap";
import { formatToIDR } from "../utils";
import customAPI from "../api";
import DataTable from "react-data-table-component";
import EmptyOrderIcon from "../assets/Image/empty_order.png";
import { useState } from "react";

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
const columns = [
  {
    name: "No.",
    selector: (row, index) => index + 1,
    width: "60px",
  },

  {
    name: "Nama Lengkap",
    selector: (row) => `${row.firstName} ${row.lastName}`,
    sortable: true,
    width: "200px",
  },
  {
    name: "Order List",
    width: "370px",
    selector: (row) => (
      <ul className="list-group p-3">
        {row.itemsDetail.map((itemProduct) => (
          <li
            key={itemProduct.product}
            className="d-flex gap-2 align-items-start list-group-item"
          >
            <figure
              className="overflow-hidden rounded"
              style={{ width: "70px", height: "70px" }}
            >
              <img
                src={
                  !itemProduct.image
                    ? "https://via.placeholder.com/300x300"
                    : itemProduct.image
                }
                alt={itemProduct.name}
                className="d-block w-100 h-100 object-fit-cover"
              />
            </figure>
            <div>
              <h6>
                <b>{itemProduct.name}</b> - {itemProduct.category}
              </h6>
              <p>
                {formatToIDR(itemProduct.price)} x{itemProduct.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: "Total",
    selector: (row) => formatToIDR(row.total),
    sortable: true,
  },
  {
    name: "Status Order",
    selector: (row) => (
      <span
        className={`btn ${
          row.status === "success"
            ? "btn-success"
            : row.status === "failed"
            ? "btn-danger"
            : "btn-warning"
        } btn-sm`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
];

const OrderHistory = () => {
  const { orders } = useLoaderData();
  const [records, setRecords] = useState(orders);
  const handleSearch = (e) => {
    const newData = orders.filter((row) =>
      row.status.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  return (
    <section id="history">
      <BannerHeader bannerTitle="Order History" />
      <Container className="py-3 py-md-5 fm-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/profile" className="btn btn-primary btn-sm me-auto">
            <i className="ri-arrow-left-circle-line me-2"></i>
            Back
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
            <p>No orders have been received yet.</p>
            <hr />
            <img
              src={EmptyOrderIcon}
              alt="Empty Orders"
              className="d-block mx-auto w-75"
            />
          </div>
        ) : (
          <DataTable
            data={records}
            columns={columns}
            pagination
            highlightOnHover
            fixedHeader
            theme="dark"
          />
        )}
      </Container>
    </section>
  );
};

export default OrderHistory;
