import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import customAPI from "../../../api.js";
import { FormInput, FormEditor, FormSelect } from "../../../components/FormInput";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../components/Breadcrumbs.jsx";

export const loader = async ({ params }) => {
  try {
    const productPromise = customAPI.get(`/product/${params.id}`);
    const categoryPromise = customAPI.get("/category");

    const [productResponse, categoryResponse] = await Promise.all([
      productPromise,
      categoryPromise,
    ]);

    return { product: productResponse.data.data, categories: categoryResponse.data.data };
  } catch (error) {
    toast.error("Gagal mengambil kategori");
    return [];
  }
}

const EditProductView = () => {
  const { product, categories } = useLoaderData();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [desc, setDesc] = useState(product?.description || "");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const category = product.category || {}

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setLoading(true);

    try {
      let imageUrl = product.image;
      if (imageFile) {
        const fileUploadData = new FormData();
        fileUploadData.append('image', imageFile);

        const { data: uploadData } = await customAPI.post("/product/file-upload", fileUploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadData.url;
      }

      const updatedData = Object.fromEntries(formData);
      await customAPI.put(`/product/${product._id}`, {
        ...updatedData,
        description: desc,
        image: imageUrl,
      });

      toast.success("Update Product Successfully");
      navigate("/admin/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  if (!product) return <p>Produk tidak ditemukan.</p>

  const breadcrumbItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Produk Mebel", path: "/admin/products" },
    { label: `Edit: ${product.name}` },
  ];

  return (
    <section className="fm-2">
      <Container>
        <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
        <h5 className="my-3">Edit Produk Mebel</h5>
        <form
          className="border border-secondary rounded p-3"
          onSubmit={handleUpdate}
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
                      <p className="mt-2">Tidak Ada Gambar</p>
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
                defaultValue={product.name}
              />

              <Row className="g-3 mt-1">
                <Col md="6">
                  <FormInput
                    name="stock"
                    type="number"
                    label="Stok:"
                    placeHolder="Masukkan Stok Mebel"
                    defaultValue={product.stock}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    name="price"
                    type="number"
                    label="Harga:"
                    placeHolder="Masukkan Harga Mebel"
                    defaultValue={product.price}
                  />
                </Col>
                <Col md="12" lg="6">
                  <FormSelect
                    name="category"
                    label="Kategori:"
                    defaultValue={category._id}
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
                    defaultValue={product.summary}
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
            <Button
              type="submit"
              variant="success"
              size="sm"
              className="px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Memperbarui...
                </>
              ) : (
                <>
                  <i className="ri-save-line me-2"></i>
                  Update
                </>
              )}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default EditProductView;
