import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import customAPI from "../../api.js";
import ForgotImages from "../../assets/Image/Forgot_password-bro.svg";
import { HelmetHead } from "../../common/Helmet.jsx";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await customAPI.post("/auth/forgot-password", { email });
      toast.success(
        res.data.message ||
        "Permintaan reset password berhasil dikirim, Silahkan Cek Email Anda!"
      );
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengirim permintaan"
      );
    } finally {
      setLoading(false);
    }
  };

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
              />
              <h1 className="mb-4 fs-4 text-center fm-2 fw-semibold">
                Lupa Kata Sandi
              </h1>
              <Form onSubmit={handleForgotPassword} className="fm-2">
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Alamat Email:</Form.Label>
                  <Form.Control
                    type="email"
                    className="fm-2 border-1 bg-white"
                    placeholder="Masukkan email yang terdaftar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Kirim Link Reset"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
