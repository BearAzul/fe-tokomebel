import { Container } from "react-bootstrap"
import DataTable from "react-data-table-component"
import customAPI from "../../api.js"
import {useLoaderData, Link, useRevalidator} from "react-router-dom"
import { useState } from "react"
import Swal from "sweetalert2"
import {toast} from "react-toastify"

export const loader = async () => {
  const { data } = await customAPI.get("/category")
  const dataCategory = data.data

  return { dataCategory }
}



const CategoryView = () => {
  const { dataCategory } = useLoaderData()
  const [records, setRecords] = useState(dataCategory);

  const handleSearch = (e) => {
    const newData = dataCategory.filter(
      (row) =>
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.description.toLowerCase().includes(e.target.value.toLowerCase()) 
    );
    setRecords(newData);
  };

  const { revalidate } = useRevalidator();

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${row.name} from Category?. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/category/${row._id}`);
          toast.success(
            `Category with name ${row.name} deleted successfully`
          );
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== row._id)
          );
          revalidate();
        } catch (error) {
          const errorMessage = error?.response?.data?.message;
          toast.info(errorMessage);
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
      name: "Icon",
      selector: (row) => <i className={`${row.icon} fs-4`}></i>,
      width: "70px",
    },
    {
      name: "Category",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "CreatedAt",
      selector: (row) => row.createdAt,
      sortable: true,
      width: "210px",
    },
    {
      name: "UpdatedAt",
      selector: (row) => row.updatedAt,
      sortable: true,
      width: "210px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-1">
          <Link
            to={`/admin/category/${row._id}/edit`}
            className="btn btn-warning btn-sm"
          >
            <i className="ri-pencil-line"></i>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row)}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
      width: "100px",
    },
  ];
  return (
    <section className="fm-2">
      <Container>
        <h5 className="mb-3">All Data Categories</h5>
        <div className="d-flex justify-content-between gap-2 align-items-center flex-column mb-2 w-100 flex-md-row">
          <Link
            to="/admin/category/add"
            className="btn btn-success btn-sm me-auto"
          >
            <i className="ri-add-circle-line me-1"></i>
            Add New Category
          </Link>
          <div className="input-group input-group-sm max-content ms-auto">
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
          columns={columns}
          data={records}
          theme="dark"
          pagination
          highlightOnHover
          fixedHeader
          className="rounded border border-secondary mb-2"
        />
      </Container>
    </section>
  );
}

export default CategoryView