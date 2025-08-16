import { useNavigate, useLoaderData } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import {
  FormInput,
  FormSelect,
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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (!imageFile) {
      toast.error("Gambar produk wajib diunggah.");
      return;
    }

    setLoading(true);
    try {
      const fileUploadData = new FormData();
      fileUploadData.append("image", imageFile);

      const { data: uploadData } = await customAPI.post(
        "/product/file-upload",
        fileUploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const productData = Object.fromEntries(formData);
      await customAPI.post("/product", {
        ...productData,
        description: desc,
        image: uploadData.url,
      });

      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview("");
    setDesc("");
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
          <Row className="g-3">
            <Col md="4">
              <div className="mb-3">
                <label className="form-label">Gambar Produk: <span className="text-danger">*</span></label>
                <div className="ratio ratio-1x1 border border-secondary rounded-2 d-flex align-items-center justify-content-center text-bg-dark">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" className="object-fit-cover w-100 h-100" rounded />
                  ) : (
                    <div className="text-center d-flex flex-column align-items-center justify-content-center">
                      <i className="ri-image-add-line fs-1"></i>
                      <p className="mt-2">Upload Gambar</p>
                    </div>
                  )}
                </div>
              </div>
              <Button type="button" variant="outline-secondary" className="w-100" onClick={() => document.getElementById('imageUpload').click()}>
                Pilih Gambar
              </Button>
              <input id="imageUpload" type="file" className="d-none" accept="image/*" onChange={handleFileChange} />
            </Col>
            <Col md="8">
              <FormInput
                name="name"
                type="text"
                label="Nama Produk Mebel:"
                placeHolder="Masukkan Nama Produk Mebel"
              />

              <Row className="g-3 mt-1">
                <Col md="6">
                  <FormInput
                    name="stock"
                    type="number"
                    label="Stok:"
                    placeHolder="Masukkan Stok Mebel"
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    name="price"
                    type="number"
                    label="Harga:"
                    placeHolder="Masukkan Harga Mebel"
                  />
                </Col>
                <Col md="12" lg="6">
                  <FormSelect
                    name="category"
                    label="Kategori Produk Mebel:"
                    options={categories.map((cat) => ({
                      value: cat._id,
                      label: cat.name,
                    }))}
                  />
                </Col>
                <Col md="12" lg="6">
                  <FormInput
                    name="summary"
                    type="text"
                    label="Ringkasan:"
                    placeHolder="Masukkan Ringkasan Produk Mebel"
                  />
                </Col>
              </Row>

              <div className="my-3">
                <FormEditor
                  label="Deskripsi:"
                  value={desc}
                  onChange={setDesc}
                  placeHolder="Masukkkan Deskripsi Mebel"
                />
              </div>
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
            <Button type="reset" variant="danger" size="sm" onClick={handleReset} disabled={loading}>
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
