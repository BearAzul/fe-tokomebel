import customAPI from "../../api.js";
import {
  useLoaderData,
  redirect,
  Link,
  useRevalidator,
} from "react-router-dom";
import DataTable from "react-data-table-component";
import { Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { formatToIDR } from "../../utils/index.jsx";
import { useState } from "react";
import Swal from "sweetalert2";
// import BlankImages from "../../assets/Image/blank_user.png"
import { HelmetHead } from "../../common/Helmet.jsx";
import { ExportOrders } from "../../components/Button.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan login sebagai admin untuk akses halaman ini!");
    return redirect("/login");
  }
  if (user.role !== "owner" && user.role !== "courier") {
    toast.warn("Hanya admin yang dapat melihat daftar pesanan");
    return redirect("/");
  }

  const { data } = await customAPI.get("/order");
  const orders = data.data;

  return { orders, user };
};

const OrdersView = () => {
  const { orders, user } = useLoaderData();
  const [records, setRecords] = useState(orders);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newData = orders.filter(
      (row) =>
        row.email.toLowerCase().includes(searchTerm) ||
        row.firstName.toLowerCase().includes(searchTerm) ||
        row.lastName.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm) ||
        row.shipping.toLowerCase().includes(searchTerm)
    );
    setRecords(newData);
  };

  const { revalidate } = useRevalidator();

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Anda yakin?",
      text: `Anda akan menghapus pesanan milik ${row.firstName}  ${row.lastName}. Aksi ini tidak bisa diurungkan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/order/${row._id}`);
          toast.success(
            `Pesanan atas nama ${row.firstName} ${row.lastName} berhasil dihapus!`
          );
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== row._id)
          );
          revalidate();
        } catch (error) {
          toast.error("Gagal menghapus pesanan. Silakan coba lagi.");
        }
      }
    });
  };

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Gambar",
      selector: (row) => (
        <figure
          className="overflow-hidden rounded m-auto"
          style={{ width: "40px", height: "40px" }}
        >
          <img
            src={row?.image || `https://ui-avatars.com/api/?name=${row.firstName}${row.lastName}&background=random`}
            alt={row.firstName}
            className="d-block w-100 h-100 object-fit-cover"
          />
        </figure>
      ),
    },
    {
      name: "Nama Pelanggan",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Kuantitas",
      selector: (row) =>
        `x${row.itemsDetail.reduce((total, item) => total + item.quantity, 0)}`,
      width: "100px",
    },
    {
      name: "Total Pembayaran",
      selector: (row) => formatToIDR(row.total),
      width: "150px",
    },
    {
      name: "Status Pembayaran",
      selector: (row) => (
        <div
          className={`rounded px-2 py-1 d-flex align-items-center justify-content-center ${row.status === "success"
            ? "text-bg-success"
            : row.status === "failed"
              ? "text-bg-danger"
              : "text-bg-warning"
            }`}
        >
          <i
            className={`me-1 ${row.status === "success"
              ? "ri-checkbox-circle-line"
              : row.status === "failed"
                ? "ri-close-circle-line"
                : "ri-error-warning-line"
              }`}
          ></i>
          {`${row.status === "success"
            ? "Berhasil"
            : row.status === "failed"
              ? "Gagal"
              : "Pending"
            }`}
        </div>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Status Pengiriman",
      selector: (row) => (
        <div className={`rounded px-2 py-1 ${row.shipping === "shipping" ? "text-bg-danger" : "text-bg-success"}`} aria-label="label shipping">
          <i
            className={`me-1 ${row.shipping === "shipping"
              ? "ri-error-warning-line"
              : "ri-checkbox-circle-line"
              }`}
          ></i>
          {row.shipping === "shipping" ? "Belum Dikirim" : "Sudah Dikirim"}
        </div>
      ),
      sortable: true,
      width: "160px"
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="d-flex gap-2 align-items-center">
          <Link to={`/admin/orders/${row._id}`} className="btn btn-info btn-sm">
            <i className="ri-user-search-line"></i>
          </Link>
          {user && user.role === "owner" && row.status !== "success" && (
            <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
              <i className="ri-delete-bin-line"></i>
            </Button>
          )}
        </div>
      ),
      width: "120px",
    },
  ];

  const breadcrumbItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Pesanan" },
  ];

  return (
    <>
      <HelmetHead title="Pesanan" />
      <section className="fm-2">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
          <div className="d-flex align-items-center gap-3 flex-md-row justify-content-between flex-column mb-3">
            <h5 className="w-100">Daftar Pesanan</h5>
            <ExportOrders data={orders} />
            <div className="input-group input-group-sm">
              <input
                type="search"
                name="search"
                className="form-control"
                placeholder="Search"
                onChange={handleSearch}
              />
              <span className="input-group-text">
                <i className="ri-search-line"></i>
              </span>
            </div>
          </div>
          <DataTable
            data={records}
            columns={columns}
            pagination
            theme="dark"
            className="rounded my-2 border border-secondary"
          />
        </Container>
      </section>
    </>
  );
};

export default OrdersView;
