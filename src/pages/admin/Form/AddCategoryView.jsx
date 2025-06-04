import {useState} from "react"
import { Container, Row, Col, Button } from "react-bootstrap";
import { FormInput, FormEditor } from "../../../components/FormInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddCategoryDirect } from "../../../components/Directlink.jsx";
import customAPI from "../../../api.js";

const AddCategoryView = () => {
  const navigate = useNavigate();
  const [desc, setDesc] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    try {
      await customAPI.post("/category", {
        name: data.name,
        description: desc,
        icon: data.icon,
      });

      toast.success("Category created successfully");
      navigate("/admin/category");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <section className="fm-2">
      <Container>
        <AddCategoryDirect />
        <h5 className="mb-3">Tambah Kategori Baru</h5>
        <form
          onSubmit={handleSubmit}
          className="border border-secondary rounded p-3"
        >
          <Row className="g-2">
            <Col sm="6">
              <FormInput
                label="Nama Kategori:"
                type="text"
                name="name"
                placeHolder="Masukkan Nama Ketegori"
              />
            </Col>
            <Col sm="6">
              <FormInput
                label="Parameter Ikon Kategori:"
                type="text"
                name="icon"
                placeHolder="Masukkan Parameter untuk Ikon Kategori"
              />
              <p className="text-warning fs-7 m-0">
                contoh: ` ri-table-line `. Diambil dari <Link
                  to="https://remixicon.com"
                  className="text-warning m-0 fs-7"
                >
                  https://remixicon.com
                </Link>
              </p>
            </Col>
            <Col sm="12">
              <FormEditor
                label="Deskripsi Singkat:"
                value={desc}
                onChange={setDesc}
                placeHolder="Masukkan Deskripsi Singkat untuk Kategori"
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
};

export default AddCategoryView;
