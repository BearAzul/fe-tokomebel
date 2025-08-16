import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import customAPI from "../../api.js";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatTanggalWaktu } from "../../utils/index.jsx";
import { HelmetHead } from "../../common/Helmet.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

const breadcrumbItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Kategori" },
];

export const loader = async () => {
  const { data } = await customAPI.get("/category");
  const dataCategory = data.data;

  return { dataCategory };
};

const CategoryView = () => {
  const { dataCategory } = useLoaderData();

  const { revalidate } = useRevalidator();

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Anda yakin?",
      text: `Anda akan menghapus kategori ${dataCategory.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/category/${dataCategory._id}`);
          toast.success(`Category with name ${dataCategory.name} deleted successfully`);
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

  return (
    <>
      <HelmetHead title="Kategori" />
      <section className="fm-2">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
          <Row lg="12" xs="1" md="2" className="g-2 mb-2 mb-md-3">
            <Col lg="8">
              <h5 className="mb-3">Daftar Kategori</h5>
            </Col>
            <Col xs="12" lg="4">
              <Link
                to="/admin/category/add"
                className="btn btn-success btn-sm w-100"
                aria-label="Tambah Button"
              >
                <i className="ri-add-circle-line me-1"></i>
                Tambah Kategori Baru
              </Link>
            </Col>
          </Row>
          <Row className="g-3 mt-1">
            {dataCategory.map((category) => (
              <Col key={category._id} lg="4" md="6" xs="12">
                <Card className="h-100 border bg-transparent text-white py-2">
                  <Card.Header className="d-flex justify-content-between gap-2 border-0">
                    <div className="d-flex align-items-center gap-2">
                      <i className={`${category.icon} fs-4`}></i>
                      <h6 className="mb-0">{category.name}</h6>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Link
                        to={`/admin/category/${category._id}/edit`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="ri-pencil-line"></i>
                      </Link>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(category)}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: category.description }} />
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center border-0">
                    <Badge className="p-2">
                      <i className="ri-box-3-line me-1"></i> {category.products ? category.products : 0} Produk
                    </Badge>
                    <p className="m-0 fs-7">ID:{(category._id).substring(0, 20) + '...'}</p>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CategoryView;
