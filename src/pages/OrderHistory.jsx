import { toast } from "react-toastify";
import { redirect, useLoaderData, Link, useNavigate } from "react-router-dom";
import BannerHeader from "../common/Banner/BannerHeader";
import { Container, Badge, Button } from "react-bootstrap";
import { formatToIDR } from "../utils";
import customAPI from "../api";
import DataTable from "react-data-table-component";
import EmptyOrderIcon from "../assets/Image/empty_order.png";
import { useState } from "react";
import { HistoryDirect } from "../components/Directlink";
import NotAwailableImg from "../assets/Image/landscape-placeholder.svg";
import { HelmetHead } from "../common/Helmet.jsx";

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

  const handleRetryPayment = async (orderId) => {
    setLoading((prev) => ({ ...prev, [orderId]: true }));

    try {
      const response = await customAPI.post(`/order/${orderId}/retry-order`);
      const { token, message } = response.data;
      toast.info(message);

      window.snap.pay(token, {
        onSuccess: function (result) {
          toast.success("Pembayaran berhasil! Status pesanan akan segera diperbarui.");
          navigate(0);
        },
        onPending: function (result) {
          toast.info("Menunggu pembayaran Anda.");
        },
        onError: function (result) {
          toast.error("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: function () {
          toast.warn("Anda menutup pop up tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan, gagal mencoba ulang pembayaran.");
    } finally {
      setLoading((prev) => ({ ...prev, [orderId]: false }));
    }
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
              className="list-group-item"
            >
              <h1 className="fw-semibold fs-6 mb-1">{itemProduct.name}</h1>
              <div className="d-flex gap-2 align-items-start">
                <figure
                  className="overflow-hidden rounded"
                  style={{ width: "70px", height: "70px" }}
                >
                  <img
                    src={!itemProduct.image ? NotAwailableImg : itemProduct.image}
                    alt={itemProduct.name}
                    className="d-block w-100 h-100 object-fit-cover"
                  />
                </figure>
                <div>
                  <Badge bg="success">{itemProduct.category}</Badge>
                  <p>
                    {formatToIDR(itemProduct.price)} x{itemProduct.quantity}
                  </p>
                </div>
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
      width: "150px"
    },
    {
      name: "Status Order",
      selector: (row) => (
        <span
          className={`btn btn-sm ${row.status === "success"
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
      width: "150px"
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      name: "Aksi",
      cell: (row) => {
        if (row.status === "pending") {
          return (
            <Button
              variant="info"
              size="sm"
              onClick={() => handleRetryPayment(row._id)}
              disabled={loading[row._id]}
            >
              {loading[row._id] ? 'Loading...' : 'Lanjutkan Bayar'}
            </Button>
          );
        }
        if (row.status === "failed") {
          return (
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleRetryPayment(row._id)}
              disabled={loading[row._id]}
            >
              {loading[row._id] ? 'Loading...' : 'Bayar Lagi'}
            </Button>
          );
        }
        return null;
      },
      width: "140px",
    }
  ];

  const handleSearch = (e) => {
    const newData = orders.filter((row) =>
      row.status.toLowerCase().includes(e.target.value.toLowerCase())
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
          <HistoryDirect />
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
          ) : (
            <DataTable
              data={records}
              columns={columns}
              pagination
              highlightOnHover
              fixedHeader
              theme="dark"
              className="rounded border border-2 border-success mb-2"
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default OrderHistory;
