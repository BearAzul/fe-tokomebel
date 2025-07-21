import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import customAPI from "../../api.js";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatTanggalWaktu } from "../../utils/index.jsx";
import { HelmetHead } from "../../common/Helmet.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

export const loader = async () => {
  const { data } = await customAPI.get("/category");
  const dataCategory = data.data;

  return { dataCategory };
};

const CategoryView = () => {
  const { dataCategory } = useLoaderData();
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
      title: "Anda yakin?",
      text: `Anda akan menghapus kategori ${row.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/category/${row._id}`);
          toast.success(`Category with name ${row.name} deleted successfully`);
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
      name: "Kategori",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Deskripsi Singkat",
      selector: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.description }} />
      ),
      sortable: true,
    },
    {
      name: "Dibuat Pada",
      selector: (row) => formatTanggalWaktu(row.createdAt),
      sortable: true,
      width: "210px",
    },
    {
      name: "Diperbarui pada",
      selector: (row) => formatTanggalWaktu(row.updatedAt),
      sortable: true,
      width: "210px",
    },
    {
      name: "Aksi",
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

  const breadcrumbItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Kategori" },
  ];

  return (
    <>
      <HelmetHead title="Kategori" />
      <section className="fm-2">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="text-white-50" /> 
          <h5 className="mb-3">Daftar Kategori</h5>
          <Row lg="2" xs="1" md="2" className="g-2 mb-2 mb-md-3">
            <Col>
              <Link
                to="/admin/category/add"
                className="btn btn-success btn-sm me-auto"
                aria-label="Tambah Button"
              >
                <i className="ri-add-circle-line me-1"></i>
                Tambah Kategori Baru
              </Link>
            </Col>
            <Col xs="12">
              <div className="input-group input-group-sm w-100">
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <span className="input-group-text" aria-label="button">
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
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
    </>
  );
};

export default CategoryView;
