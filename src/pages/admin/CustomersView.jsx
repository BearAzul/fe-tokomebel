import { Container, Button } from "react-bootstrap";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import customAPI from "../../api.js";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ExportCSV from "../../components/export/exportCSV.jsx";
import { exportPDF } from "../../components/export/exportPDF.jsx"; 

export const loader = async () => {
  const { data } = await customAPI.get("/auth/users");
  const dataCustomers = data.data;

  return { dataCustomers };
};

const CustomersView = () => {
  const { dataCustomers } = useLoaderData();
  const [records, setRecords] = useState(dataCustomers);

  const handleSearch = (e) => {
    const newData = dataCustomers.filter(
      (row) =>
        row.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const { revalidate } = useRevalidator();

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${row.firstName} ${row.lastName}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/auth/users/${row._id}`);
          toast.success(
            `Customer with name ${row.firstName} ${row.lastName} deleted successfully`
          );
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== row._id)
          );
          revalidate();
        } catch (error) {
          toast.error("Failed to delete customer. Please try again.");
        }
      }
    });
  };

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Image",
      selector: (row) => (
        <figure className="overflow-hidden rounded m-auto" style={{width: "40px", height: "40px"}}>
          <img
            src={!row.image ? "https://via.placeholder.com/300x300": row.image}
            alt={row.firstName}
            className="d-block w-100 h-100 object-fit-cover"
          />
        </figure>
      ),
    },
    {
      name: "Nama Customer",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      width: "250px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "300px",
    },
    {
      name: "No. Telp",
      selector: (row) => row.phone,
      width: "150px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      width: "100px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <Link
            to={`/admin/customers/${row._id}/edit`}
            className="btn btn-warning btn-sm"
          >
            <i className="ri-pencil-line"></i>
          </Link>
          <Button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row)}
          >
            <i className="ri-delete-bin-6-line"></i>
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <section className="fm-2">
      <Container>
        <div className="d-flex justify-content-between gap-3 align-items-center mb-3 flex-wrap">
          <h5 className="fm-2">All Data Customers</h5>
          <div className="d-flex gap-1 align-items-center">
            <ExportCSV data={dataCustomers} />
            <Button
              variant="secondary"
              size="sm"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-title="Download PDF"
              onClick={() => exportPDF(dataCustomers)}
            >
              <i className="ri-file-pdf-2-line"></i>
            </Button>
            <div className="input-group input-group-sm">
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
        </div>
        <DataTable
          columns={columns}
          data={records}
          pagination
          highlightOnHover
          fixedHeader
          theme="dark"
          className="rounded border border-secondary mb-2"
          persistTableHead
        />
      </Container>
    </section>
  );
};

export default CustomersView;
