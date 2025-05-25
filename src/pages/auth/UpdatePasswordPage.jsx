import { useState } from "react"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import customAPI from "../../api.js";
import ResetImages from "../../assets/Image/Reset_password-cuate.svg";


const UpdatePasswordPage = () => {
  const { token } = useParams(); // Token dari URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi tidak cocok!");
      setLoading(false);
      return;
    }

    try {
      const res = await customAPI.post(`/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      toast.success(res.data.message || "Password berhasil diubah!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengubah password!");
    } finally {
      setLoading(false);
    }
  };
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
            />
            <h4 className="mb-4 text-center fm-2 fw-semibold">Atur Ulang Kata Sandi</h4>
            <Form onSubmit={handleResetPassword} className="fm-2">
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password Baru:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Konfirmasi Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Reset Password"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UpdatePasswordPage