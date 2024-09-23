import { useEffect, useState } from "react";
import { useNavigate, useParams, Link} from "react-router-dom";
import customAPI from "../../../api.js";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading.jsx";

const EditProductView = () => {
  const categories = ["Bed", "Chair", "Wardrobe", "Sofa", "Lamps", "Table"];
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const getProduct = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    getProduct();
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
        description: data.description,
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
        <Link to="/admin/products" className="btn btn-primary btn-sm">
          <i className="ri-arrow-left-circle-line me-1"></i>
          Back
        </Link>
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
                  label="Product Name:"
                  placeHolder="Enter Product Name"
                  defaultValue={product.name}
                />
              </Col>
              <Col>
                <FormInput
                  name="stock"
                  type="number"
                  label="Stock:"
                  placeHolder="Enter Product Stock"
                  defaultValue={product.stock}
                />
              </Col>
              <Col>
                <FormInput
                  name="price"
                  type="number"
                  label="Price:"
                  placeHolder="Enter Product Price"
                  defaultValue={product.price}
                />
              </Col>
              <Col>
                <FormSelect
                  name="category"
                  label="Category:"
                  defaultValue={product.category}
                  options={categories}
                />
              </Col>
              <Col md="12" lg="8">
                <FormInput
                  name="summary"
                  type="text"
                  label="Summary:"
                  placeHolder="Enter Summary Product"
                  defaultValue={product.summary}
                />
              </Col>
              <Col md="12" lg="12">
                <FormTextarea
                  name="description"
                  label="Description:"
                  placeHolder="Enter Product Description"
                  defaultValue={product.description}
                  Row={3}
                />
              </Col>
              <Col lg="8">
                <label htmlFor="image" className="form-label">
                  Choose File Images:
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
