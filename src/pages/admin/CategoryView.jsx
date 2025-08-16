import { Container, Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import customAPI from "../../api.js";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatTanggalWaktu } from "../../utils/index.jsx";
import { HelmetHead } from "../../common/Helmet.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import { useState } from "react";
import FormCategory from "./Form/FormCategory.jsx";

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

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowAddModal = () => {
    setIsEditMode(false);
    setSelectedCategory(null);
    setDesc("");
    setShowModal(true);
  };

  const handleShowEditModal = (category) => {
    setIsEditMode(true);
    setSelectedCategory(category);
    setDesc(category.description || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setDesc("");
  };


  const handleSubmit = async (e) => { 
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      name: data.name,
      icon: data.icon,
      description: desc,
    }

    setLoading(true);

    try {
      if (isEditMode) {
        await customAPI.put(`/category/${selectedCategory._id}`, payload);
        toast.success(`Kategori "${payload.name}" berhasil diperbarui.`);
      } else {
        await customAPI.post("/category", payload);
        toast.success(`Kategori "${payload.name}" berhasil dibuat.`);
      }
      revalidate();
      handleCloseModal();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Terjadi kesalahan.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (category) => {
    Swal.fire({
      title: "Anda yakin?",
      text: `Anda akan menghapus kategori ${category.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAPI.delete(`/category/${category._id}`);
          toast.success(`Category with name ${category.name} deleted successfully`);
          revalidate();
        } catch (error) {
          const errorMessage = error?.response?.data?.message;
          toast.info(errorMessage);
        }
      }
    });
  };

  return (
    <>
      <HelmetHead title="Kategori" />
      <section className="fm-2">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
          <Row lg="12" xs="1" md="2" className="g-2 mb-3">
            <Col lg="8">
              <h5 className="mb-3">Daftar Kategori</h5>
            </Col>
            <Col xs="12" lg="4">
              <Button
                variant="success"
                size="sm"
                className="w-100"
                onClick={handleShowAddModal}
                aria-label="Tambah Button"
              >
                <i className="ri-add-circle-line me-1"></i>
                Tambah Kategori Baru
              </Button>
            </Col>
          </Row>
          <Row className="g-3">
            {dataCategory.map((category) => (
              <Col key={category._id} lg="4" md="6" xs="12">
                <Card className="h-100 border bg-transparent text-white py-2">
                  <Card.Header className="d-flex justify-content-between gap-2 border-0">
                    <div className="d-flex align-items-center gap-2">
                      <i className={`${category.icon} fs-4`}></i>
                      <h6 className="mb-0">{category.name}</h6>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleShowEditModal(category)}
                      >
                        <i className="ri-pencil-line"></i>
                      </Button>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(category)}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body className="text-wrap">
                    <div dangerouslySetInnerHTML={{ __html: category.description }} />
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center border-0">
                    <Badge className="p-2">
                      <i className="ri-box-3-line me-1"></i> {
                        category.products.length ? category.products.length : 0
                      } Produk Mebel
                    </Badge>
                    <p className="m-0 fs-7">ID:{(category._id).substring(0, 15) + '...'}</p>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Modal show={showModal} onHide={handleCloseModal} centered className="fm-2 text-white" data-bs-theme="dark" >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Kategori" : "Tambah Kategori Baru"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="categoryForm" onSubmit={handleSubmit}>
            <FormCategory categoryData={selectedCategory} description={desc} onDescriptionChange={setDesc} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="success" size="sm" type="submit" form="categoryForm" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Menyimpan...
              </>
            ) : (
              <>
                <i className={isEditMode ? "ri-save-line me-2" : "ri-add-circle-line me-2"}></i>
                {isEditMode ? "Update" : "Simpan"}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryView;
