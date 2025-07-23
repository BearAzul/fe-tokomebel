import { Form, Button, Container, Row, Col } from "react-bootstrap";
import customAPI from "../../api.js";
import { toast } from "react-toastify";
import { Form as RouterForm, useNavigation, redirect } from "react-router-dom";
import VerifyImages from "../../assets/Image/Authentication-cuate.svg";
import { HelmetHead } from "../../common/Helmet.jsx";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customAPI.post("/auth/verify-email", data);
    toast.success(res.data.message || "Verifikasi berhasil, Silahkan login!");
    return redirect("/login");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Terjadi kesalahan saat verifikasi"
    );
    return null;
  }
};

const VerifyAccountPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <HelmetHead title="Verifikasi Email" link="/verify-email" description="Verifikasi email untuk mengaktifkan akun Anda. Silakan periksa email Anda dan klik tautan verifikasi ini untuk melanjutkan proses pendaftaran" />
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
                alt="image verify"
              />
              <h1 className="text-center fs-4 fw-bold fm-2">Verifikasi Email</h1>
              <p className="mb-4 text-center fm-2 fs-7">
                Silahkan cek email anda untuk mendapatkan kode:
              </p>
              <RouterForm method="post" className="fm-4">
                <Form.Group controlId="verifyCode" className="mb-3">
                  <Form.Label>Kode Verifikasi:</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="verifyCode"
                    placeholder="Masukkan 6 digit kode"
                    className="border-1 bg-white"
                    required
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? "Memverifikasi..." : "Verifikasi"}
                </Button>
              </RouterForm>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default VerifyAccountPage;
