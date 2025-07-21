import { useState } from "react";
import { useNavigate, useParams, Link, redirect, useLoaderData } from "react-router-dom";
import customAPI from "../../../api.js";
import { FormInput, FormEditor } from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../components/Breadcrumbs.jsx";

export const loader = async ({ params }) => {
  try {
    const { data } = await customAPI.get(`/category/${params.id}`);
    return { category: data.data };
  } catch (error) {
    toast.error("Gagal mengambil data kategori.");
    return redirect("/admin/category");
  }
};

const EditCategoryView = () => {
  const { category } = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [desc, setDesc] = useState(category.description || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Kategori", path: "/admin/category" },
    { label: `Edit: ${category.name}` },
  ];

  return (
    <section className="fm-2">
      <Container>
        <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
        <h5 className="my-3">Edit Kategori</h5>

        <form
          className="border border-secondary rounded p-3"
          onSubmit={handleUpdate}
        >
          <Row className="g-2">
            <Col sm="6">
              <FormInput
                label="Nama Kategori:"
                type="text"
                name="category"
                placeHolder="Masukkan Nama Ketegori"
                defaultValue={category.name}
              />
            </Col>
            <Col sm="6">
              <FormInput
                label="Parameter Ikon Kategori:"
                type="text"
                name="icon"
                placeHolder="Masukkan Parameter untuk Ikon Kategori"
                defaultValue={category.icon}
              />
              <p className="text-warning fs-7 m-0">
                contoh: ` ri-table-line `. Diambil dari{" "}
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
                label="Deskripsi Singkat:"
                value={desc}
                onChange={setDesc}
                placeHolder="Masukkan Deskripsi Singkat untuk Kategori"
              />
            </Col>
          </Row>
          <Button variant="success" size="sm" type="submit" className="mt-3"
            disabled={loading}>
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
        </form>
      </Container>
    </section>
  );
};

export default EditCategoryView;
