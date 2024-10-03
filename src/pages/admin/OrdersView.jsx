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
import { useState } from "react"
import Swal from "sweetalert2"

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  const { data } = await customAPI.get("/order");

  if (!user) {
    toast.warn("Silahkan login sebagai admin untuk akses halaman ini!");
    return redirect("/login");
  }

  if (user.role !== "owner") {
    toast.warn("Hanya admin yang dapat melihat daftar pesanan");
    return redirect("/");
  }
  const orders = data.data;

  return { orders };
};
const OrdersView = () => {
  const { orders } = useLoaderData();
  const [records, setRecords] = useState(orders)


   const handleSearch = (e) => {
     const newData = orders.filter(
       (row) =>
         row.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
         row.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
         row.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
         row.status.toLowerCase().includes(e.target.value.toLowerCase())
     );
     setRecords(newData);
  };
  
  const { revalidate } = useRevalidator();

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `
      You are about to delete the order by: ${row.firstName} ${row.lastName}. This action cannot be undone.
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/order/${row._id}`);
          toast.success(
            `Order Product by name ${row.firstName} ${row.lastName} deleted successfully`
          );
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== row._id)
          );
          revalidate();
        } catch (error) {
          toast.error("Failed to delete Customer Order. Please try again.");
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
      name: "Image",
      selector: (row) => (
        <figure
          className="overflow-hidden rounded m-auto"
          style={{ width: "40px", height: "40px" }}
        >
          <img
            src={!row.image ? "https://via.placeholder.com/300x300" : row.image}
            alt={row.firstName}
            className="d-block w-100 h-100 object-fit-cover"
          />
        </figure>
      ),
    },
    {
      name: "Customer Name",
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
      name: "Quantity",
      selector: (row) =>
        `x${row.itemsDetail.reduce((total, item) => total + item.quantity, 0)}`,
      width: "100px",
    },
    {
      name: "Total Price",
      selector: (row) => formatToIDR(row.total),
      width: "150px",
    },
    {
      name: "Status Payment",
      selector: (row) => (
        <div
          className={`rounded px-2 py-1 d-flex align-items-center justify-content-center ${
            row.status === "success"
              ? "text-bg-success"
              : row.status === "failed"
              ? "text-bg-danger"
              : "text-bg-warning"
          }`}
        >
          <i
            className={`me-1 ${
              row.status === "success"
                ? "ri-checkbox-circle-line"
                : row.status === "failed"
                ? "ri-close-circle-line"
                : "ri-error-warning-line"
            }`}
          ></i>
          {`${
            row.status === "success"
              ? "success"
              : row.status === "failed"
              ? "failed"
              : "pending"
          }`}
        </div>
      ),
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex gap-2 align-items-center">
          <Link to={`/admin/orders/${row._id}`} className="btn btn-info btn-sm">
            <i className="ri-user-search-line"></i>
          </Link>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
            <i className="ri-delete-bin-line"></i>
          </Button>
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <section className="fm-2">
      <Container>
        <div className="d-flex align-items-center gap-3 flex-md-row justify-content-between flex-column mb-3">
          <h5 className="w-100">Order List</h5>
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
  );
};

export default OrdersView;
