import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import customAPI from "../../../api.js";
import { FormInput, FormEditor } from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { EditCategoryDirect } from "../../../components/Directlink.jsx";
import Loading from "../../../components/Loading.jsx";

const EditCategoryView = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [desc, setDesc] = useState("");

  const getCategory = async () => {
    const { data } = await customAPI.get(`/category/${id}`);
    setCategory(data.data);
    setDesc(data.data.description);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      await customAPI.put(`/category/${id}`, {
        name: data.name,
        description: desc,
        icon: data.icon,
      });

      toast.success("Update Category Data Successfully");
      navigate("/admin/category");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };
  return (
    <section className="fm-2">
      <Container>
        <EditCategoryDirect />
        <h5 className="my-3">Edit a Category Data</h5>
        {category ? (
          <form
            className="border border-secondary rounded p-3"
            onSubmit={handleUpdate}
          >
            <Row className="g-2">
              <Col sm="6">
                <FormInput
                  label="Category Name:"
                  type="text"
                  name="category"
                  placeHolder="Enter Category Name"
                  defaultValue={category.name}
                />
              </Col>
              <Col sm="6">
                <FormInput
                  label="Parameters Icon Category"
                  type="text"
                  name="icon"
                  placeHolder="Enter Parameters Icon Category"
                  defaultValue={category.icon}
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
                <FormEditor
                  label="Description:"
                  value={desc}
                  onChange={setDesc}
                  placeHolder="Enter Description for Category"
                />
              </Col>
            </Row>
            <Button variant="success" size="sm" type="submit" className="mt-3">
              <i className="ri-save-line me-2"></i>
              Update
            </Button>
          </form>
        ) : (
          <Loading />
        )}
      </Container>
    </section>
  );
};

export default EditCategoryView;
