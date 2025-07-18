import { toast } from "react-toastify"
import { Form as RouterForm, useNavigation, redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import customAPI from "../../api.js";
import ResetImages from "../../assets/Image/Reset_password-cuate.svg";

export const action = async ({ request, params }) => {
  const { token } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.password !== data.confirmPassword) {
    toast.error("Password dan konfirmasi tidak cocok!");
    return null;
  }

  try {
    const res = await customAPI.post(`/auth/reset-password/${token}`, data);
    toast.success(res.data.message || "Password berhasil diubah!");
    return redirect("/login");
  } catch (error) {
    toast.error(error.response?.data?.message || "Gagal mengubah password!");
    return null;
  }
};

const UpdatePasswordPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <section
      id="updatePassword"
      className="bg-white overflow-hidden bg-dark-green"
    >
      <Container className="py-3 py-5 px-3">
        <Row className="justify-content-md-center m-3">
          <Col xs={12} md={6} className="bg-white rounded-3 p-4" data-aos="zoom-in">
            <img
              className="d-block mx-auto my-3"
              style={{ width: "200px" }}
              src={ResetImages}
              alt="image update"
            />
            <h1 className="mb-4 fs-4 text-center fm-2 fw-semibold">Atur Ulang Kata Sandi</h1>
            <RouterForm method="post" className="fm-2">
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password Baru:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password baru"
                  name="password"
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Konfirmasi Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ulangi password"
                  name="confirmPassword"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Reset Password"}
              </Button>
            </RouterForm>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UpdatePasswordPage