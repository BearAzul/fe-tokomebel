import {Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FormInput, FormTextarea, FormSelect } from "../../../components/FormInput.jsx";
import customAPI from "../../../api.js";
import { toast } from "react-toastify";

const AddProductView = () => {
  const categories = ["Bed", "Chair", "Wardrobe", "Sofa", "Lamps", "Table"];
  const navigate = useNavigate();
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
        description: data.description,
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
        <Link to="/admin/products" className="btn btn-primary btn-sm">
          <i className="ri-arrow-left-circle-line me-1"></i>
          Back
        </Link>
        <h5 className="my-3">Add a New Product</h5>
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
                label="Product Name:"
                placeHolder="Enter Product Name"
              />
            </Col>
            <Col>
              <FormInput
                name="stock"
                type="number"
                label="Stock:"
                placeHolder="Enter Product Stock"
              />
            </Col>
            <Col>
              <FormInput
                name="price"
                type="number"
                label="Price:"
                placeHolder="Enter Product Price"
              />
            </Col>
            <Col>
              <FormSelect
                name="category"
                label="Category:"
                options={categories}
              />
            </Col>
            <Col md="12" lg="8">
              <FormInput
                name="summary"
                type="text"
                label="Summary:"
                placeHolder="Enter Summary Product"
              />
            </Col>
            <Col md="12" lg="12">
              <FormTextarea
                name="description"
                label="Description:"
                placeHolder="Enter Product Description"
                Row={3}
              />
            </Col>
            <Col lg="8">
              <label htmlFor="image" className="form-label">
                choose Images:
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
