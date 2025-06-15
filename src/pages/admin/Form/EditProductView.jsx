import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customAPI from "../../../api.js";
import { FormInput, FormEditor, FormSelect } from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { EditProductDirect } from "../../../components/Directlink.jsx";
import Loading from "../../../components/Loading.jsx";

const EditProductView = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await customAPI.get(`/product/${id}`);
      setProduct(data.data);
      setDesc(data.data.description);
    } catch (err) {
      toast.error("Gagal mengambil data produk");
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await customAPI.get("/category");
      setCategories(data.data);
    } catch (err) {
      toast.error("Gagal mengambil kategori");
    }
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      let imageUrl = product.image;
      if (formData.get("image").name) {
        const uploadImage = await customAPI.post(
          "/product/file-upload",
          {
            image: formData.get("image"),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadImage.data.url;
      }

      await customAPI.put(`/product/${id}`, {
        name: data.name,
        stock: data.stock,
        price: data.price,
        category: data.category,
        summary: data.summary,
        description: desc,
        image: imageUrl,
      });

      toast.success("Update Product Successfully");
      navigate("/admin/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <section className="fm-2">
      <Container>
        <EditProductDirect />
        <h5 className="my-3">Edit a Product</h5>
        {product ? (
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
                  value={product.category?._id || product.category}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  options={categories.map((category) => ({
                    key: category._id,
                    value: category._id,
                    label: category.name,
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
                  defaultValue={product.image}
                />
              </Col>
            </Row>
            <div className="d-flex gap-2 align-items-center mt-3">
              <Button
                type="submit"
                variant="success"
                size="sm"
                className="px-4"
              >
                <i className="ri-add-circle-line me-1"></i>
                Update
              </Button>
            </div>
          </form>
        ) : (
          <Loading />
        )}
      </Container>
    </section>
  );
};

export default EditProductView;
