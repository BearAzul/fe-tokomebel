import "../../styles/index.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import imgsignup from "../../assets/Image/signup-img.svg";
import { redirect, Form, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customAPI from "../../api.js";
import { registerUser } from "../../features/userSlice.js";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/register", data);
      store.dispatch(registerUser(response.data));
      toast.success("Register Success, please login!");
      return redirect("/login");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const RegisterPage = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const handleEyePassword = () => {
    setIsPassword(!isPassword);
  };

  const handleEyeConfirmPassword = () => {
    setIsConfirmPassword(!isConfirmPassword);
  };

  return (
    <section id="register" className="bg-dark-green">
      <Container className="py-5">
        <div className="card__container mx-auto">
          <Card
            className="bg-light p-3 mx-auto text-bg-dark border-0 w-100"
            data-aos="zoom-in"
          >
            <Card.Img
              className="d-block mx-auto my-3"
              style={{ width: "300px" }}
              src={imgsignup}
            />

            <Card.Title className="fm-1 text-center fw-bold text-dark-dark">
              Create your account
            </Card.Title>
            <Card.Body>
              <Form method="post">
                <Row xs="1" md="2" className="g-2 mb-3">
                  <Col>
                    <div className="input-group">
                      <input
                        type="text"
                        name="firstName"
                        className="fm-2 form-control"
                        placeholder="Enter First Name"
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="input-group">
                      <input
                        type="text"
                        name="lastName"
                        className="fm-2 form-control"
                        placeholder="Enter Last Name"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="mb-3 input-group">
                  <input
                    type="email"
                    name="email"
                    className="fm-2 form-control"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="mb-3 d-flex input-group">
                  <input
                    type={isPassword ? "password" : "text"}
                    name="password"
                    className="fm-2 rounded-0 rounded-start border-end-0 form-control"
                    placeholder="Password"
                  />
                  <Button
                    variant="light"
                    className="bg-white border border-start-0 rounded-0 rounded-end"
                    onClick={handleEyePassword}
                  >
                    <i
                      className={isPassword ? "ri-eye-off-line" : "ri-eye-line"}
                    ></i>
                  </Button>
                </div>
                <div className="mb-3 d-flex flex-column input-group">
                  <div className="d-flex">
                    <input
                      type={isConfirmPassword ? "password" : "text"}
                      name="confirmPassword"
                      className="fm-2 rounded-0 rounded-start border-end-0 form-control"
                      placeholder="Confirm Password"
                    />
                    <Button
                      variant="light"
                      className="bg-white border border-start-0 rounded-0 rounded-end"
                      onClick={handleEyeConfirmPassword}
                    >
                      <i
                        className={
                          isConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"
                        }
                      ></i>
                    </Button>
                  </div>
                </div>

                <div className="mb-4 fm-3 text-center input-group">
                  <Button
                    variant="success"
                    type="submit"
                    className="px-5 fw-semibold w-100"
                  >
                    Register
                  </Button>
                </div>
              </Form>
              <div className="fm-2 fs-7 text-center d-flex justify-content-center gap-1 align-items-center input-group">
                <p className="m-0 text-keep">Have an account?</p>
                <Link to="/login" className="btn btn-link btn-sm fs-7">
                  Login
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default RegisterPage;
