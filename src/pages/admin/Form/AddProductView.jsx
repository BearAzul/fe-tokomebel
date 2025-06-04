import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FormInput,
  FormEditor,
  FormSelect,
} from "../../../components/FormInput.jsx";
import customAPI from "../../../api.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AddProductDirect } from "../../../components/Directlink.jsx";

const AddProductView = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const getCategories = async () => {
    const { data } = await customAPI.get("/category");
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    try {
      const uploadImage = await customAPI.post(
        "/product/file-upload",
        {
          image: data.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await customAPI.post("/product", {
        name: data.name,
        summary: data.summary,
        description: desc,
        price: data.price,
        stock: data.stock,
        image: uploadImage.data.url,
        category: data.category,
      });

      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };
  return (
    <section className="fm-2">
      <Container>
        <AddProductDirect />
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
              <FormSelect
                name="category"
                label="Kategori:"
                options={categories.map((category) => ({
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
            <Button type="submit" variant="success" size="sm">
              <i className="ri-add-circle-line me-1"></i>
              Submit
            </Button>
            <Button type="reset" variant="danger" size="sm">
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
