import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormInput, FormEditor } from "../../../components/FormInput.jsx";

const CategoryForm = ({ categoryData, description, onDescriptionChange }) => {
  return (
    <Row className="g-3">
      <Col sm="12">
        <FormInput
          label="Nama Kategori:"
          type="text"
          name="name"
          placeHolder="Masukkan Nama Kategori"
          defaultValue={categoryData?.name || ""}
          required
        />
      </Col>
      <Col sm="12">
        <FormInput
          label="Parameter Ikon Kategori:"
          type="text"
          name="icon"
          placeHolder="e.g., ri-table-line"
          defaultValue={categoryData?.icon || ""}
          required
        />
        <p className="text-muted fs-7 m-0">
          Ambil dari{" "}
          <Link to="https://remixicon.com" target="_blank" rel="noopener noreferrer" className="fs-7">
            Remix Icon
          </Link>
          . Contoh: `ri-table-line`
        </p>
      </Col>
      <Col sm="12">
        <FormEditor
          label="Deskripsi Singkat:"
          value={description}
          onChange={onDescriptionChange}
          placeHolder="Masukkan deskripsi singkat untuk kategori"
        />
      </Col>
    </Row>
  );
};

export default CategoryForm;