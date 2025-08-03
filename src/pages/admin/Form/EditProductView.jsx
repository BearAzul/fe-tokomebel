import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import customAPI from "../../../api.js";
import { FormInput, FormEditor, FormSelect } from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
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
  const [desc, setDesc] = useState(product?.description || "");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const category = product.category || {}

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setLoading(true);

    try {
      let imageUrl = product.image;
      if (formData.get("image")?.name) {
        const { data: uploadData } = await customAPI.post("/product/file-upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadData.url;
      }

      const updatedData = Object.fromEntries(formData);
      await customAPI.put(`/product/${id}`, {
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
          <Row lg="3" xs="1" md="2" className="g-3">
            <Col>
              <FormInput
                name="name"
                type="text"
                label="Nama Produk Mebel:"
                placeHolder="Masukkan Nama Produk Mebel"
                defaultValue={product.name}
              />
            </Col>
            <Col>
              <FormInput
                name="stock"
                type="number"
                label="Stok:"
                placeHolder="Masukkan Stok Mebel"
                defaultValue={product.stock}
              />
            </Col>
            <Col>
              <FormInput
                name="price"
                type="number"
                label="Harga:"
                placeHolder="Masukkan Harga Mebel"
                defaultValue={product.price}
              />
            </Col>
            <Col>
              <FormSelect
                name="category"
                label="Kategori:"
                defaultValue={category.name}
                options={categories.map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                }))}
              />
            </Col>

            <Col md="12" lg="8">
              <FormInput
                name="summary"
                type="text"
                label="Ringkasan:"
                placeHolder="Masukkan Ringkasan Produk Mebel"
                defaultValue={product.summary}
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
              <img
                src={product.image}
                alt={product.name}
                className="d-block w-50"
              />
              <input
                type="file"
                name="image"
                id="image"
                className="form-control form-control-sm mt-2"
              />
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
        )
      </Container>
    </section>
  );
};

export default EditProductView;
