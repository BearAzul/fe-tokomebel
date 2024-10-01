import { Container, Row, Col, Button } from "react-bootstrap"
import { FormInput, FormTextarea } from "../../../components/FormInput.jsx"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import customAPI from "../../../api.js"

const AddCategoryView = () => {
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    try {
      await customAPI.post("/category", {
        name: data.name,
        description: data.description,
        icon: data.icon,
      });

      toast.success("Category created successfully");
      navigate("/admin/category");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }

  }

  return (
    <section className="fm-2">
      <Container>
        <Link to="/admin/category" className="btn btn-primary btn-sm mb-3">
          <i className="ri-arrow-left-circle-line me-1"></i>
          Back
        </Link>
        <h5 className="mb-3">Add New Category</h5>
        <form
          onSubmit={handleSubmit}
          className="border border-secondary rounded p-3"
        >
          <Row className="g-2">
            <Col sm="6">
              <FormInput
                label="Category Name:"
                type="text"
                name="category"
                placeHolder="Enter Category Name"
              />
            </Col>
            <Col sm="6">
              <FormInput
                label="Parameters Icon Category"
                type="text"
                name="icon"
                placeHolder="Enter Parameters Icon Category"
              />
              <p className="text-warning fs-7 m-0">
                example: ` ri-table-line `.{" "}
                <Link
                  to="https://remixicon.com"
                  className="text-warning m-0 fs-7"
                >
                  https://remixicon.com
                </Link>
              </p>
            </Col>
            <Col sm="12">
              <FormTextarea
                label="Description"
                Row={3}
                name="description"
                placeHolder="Enter Description for Category"
              />
            </Col>
          </Row>
          <Button variant="success" size="sm" type="submit" className="mt-3">
            <i className="ri-save-line me-2"></i>
            Create
          </Button>
        </form>
      </Container>
    </section>
  );
}

export default AddCategoryView