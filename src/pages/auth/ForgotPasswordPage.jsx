import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Form as RouterForm, useNavigation, redirect } from "react-router-dom"
import { toast } from "react-toastify";
import customAPI from "../../api.js";
import ForgotImages from "../../assets/Image/Forgot_password-bro.svg";
import { HelmetHead } from "../../common/Helmet.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customAPI.post("/auth/forgot-password", data);
    toast.success(
      res.data.message ||
      "Permintaan reset password berhasil dikirim, Silahkan Cek Email Anda!"
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengirim permintaan"
    );
  }
  return null;
};

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <HelmetHead
        title="Lupa Kata Sandi?"
        link="/forgot-password"
        description="Masukkan alamat email Anda untuk menerima tautan reset kata sandi. Pastikan email yang Anda gunakan terdaftar di aplikasi kami."
      />
      <section id="forgot" className="bg-white overflow-hidden bg-dark-green">
        <Container className="py-3 px-3">
          <Row className="justify-content-md-center m-3">
            <Col
              xs={12}
              md={6}
              className="bg-white rounded-3 pb-4 px-4"
              data-aos="zoom-in"
            >
              <img
                className="d-block mx-auto my-3"
                style={{ width: "250px" }}
                src={ForgotImages}
                alt="image forgot password"
              />
              <h1 className="mb-4 fs-4 text-center fm-2 fw-semibold">
                Lupa Kata Sandi
              </h1>
              <RouterForm method="post" className="fm-2">
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Alamat Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="fm-2 border-1 bg-white"
                    placeholder="Masukkan email yang terdaftar"
                    size="sm"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Link Reset"}
                </Button>
              </RouterForm>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
