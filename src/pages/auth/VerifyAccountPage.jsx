import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import customAPI from "../../api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VerifyImages from "../../assets/Image/Authentication-cuate.svg";

const VerifyAccountPage = () => {
  const [verifyCode, setVerifyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await customAPI.post("/auth/verify-email", { verifyCode });
      toast.success(res.data.message || "Verifikasi berhasil, Silahkan login!");
      setVerifyCode("");
      navigate("/login")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat verifikasi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="verify" className="bg-white overflow-hidden bg-dark-green">
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
              src={VerifyImages}
            />
            <h4 className="text-center fw-bold fm-2">Verifikasi Email</h4>
            <p className="mb-4 text-center fm-2 fs-7">
              Silahkan cek email anda untuk mendapatkan kode:
            </p>
            <Form onSubmit={handleVerify} className="fm-4">
              <Form.Group controlId="verifyCode" className="mb-3">
                <Form.Label>Kode Verifikasi:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Masukkan 6 digit kode"
                  className="border-1 bg-white"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  required
                  maxLength={6}
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                size="sm"
                disabled={loading}
                className="w-100"
              >
                {loading ? "Memverifikasi..." : "Verifikasi"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default VerifyAccountPage;
