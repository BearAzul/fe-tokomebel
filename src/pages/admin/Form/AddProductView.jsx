import { useNavigate, useLoaderData } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FormInput,
  FormEditor
} from "../../../components/FormInput.jsx";
import customAPI from "../../../api.js";
import { toast } from "react-toastify";
import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs.jsx";

const breadcrumbItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Produk Mebel", path: "/admin/products" },
  { label: "Tambah Mebel" },
];

export const loader = async () => { 
  try {
    const { data } = await customAPI.get("/category");
    return { categories: data.data };
  } catch (error) {
    toast.error("Failed to load categories");
    return [];
  }
}

const AddProductView = () => {
  const { categories } = useLoaderData();
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const { data: uploadData } = await customAPI.post("/product/file-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const productData = Object.fromEntries(formData);
      await customAPI.post("/product", {
        ...productData,
        description: desc,
        image: uploadData.url,
      });

      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fm-2">
      <Container>
        <Breadcrumbs items={breadcrumbItems} className="text-white-50" /> 
        <h5 className="my-3">Tambah Produk Mebel</h5>
        <form
          className="border border-secondary rounded p-3"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Row lg="3" xs="1" md="2" className="g-3">
            <Col>
              <FormInput
                name="name"
                type="text"
                label="Nama Produk Mebel:"
                placeHolder="Masukkan Nama Produk Mebel"
              />
            </Col>
            <Col>
              <FormInput
                name="stock"
                type="number"
                label="Stok:"
                placeHolder="Masukkan Stok Mebel"
              />
            </Col>
            <Col>
              <FormInput
                name="price"
                type="number"
                label="Harga:"
                placeHolder="Masukkan Harga Mebel"
              />
            </Col>
            <Col>
              <label htmlFor="category" className="form-label">
                Kategori Produk Mebel: <span className="text-danger">*</span>
              </label>
              <select name="category" id="category" className="form-select form-select-sm">
                <option value="">Pilih Kategori Produk Mebel</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md="12" lg="8">
              <FormInput
                name="summary"
                type="text"
                label="Ringkasan:"
                placeHolder="Masukkan Ringkasan Produk Mebel"
              />
            </Col>
            <Col md="12" lg="12">
              <FormEditor
                label="Deskripsi:"
                value={desc}
                onChange={setDesc}
                placeHolder="Masukkkan Deskripsi Mebel"
              />
            </Col>
            <Col lg="8">
              <label htmlFor="image" className="form-label">
                Pilih Gambar Mebel:
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control form-control-sm"
              />
            </Col>
          </Row>
          <div className="d-flex gap-2 align-items-center mt-3">
            <Button type="submit" variant="success" size="sm" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Menyimpan...
                </>
              ) : (
                <>
                  <i className="ri-add-circle-line me-1"></i>
                  Create
                </>
              )}
            </Button>
            <Button type="reset" variant="danger" size="sm" disabled={loading}>
              <i className="ri-loop-right-line me-1"></i>
              Reset
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default AddProductView;
