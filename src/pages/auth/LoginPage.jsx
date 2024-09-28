import "../../styles/index.css";
import { Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import imglogin from "../../assets/Image/login-img.svg";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../features/userSlice.js";
import { Form } from "react-router-dom";
import customAPI from "../../api.js";
// import IconGoogle from "../../assets/Image/google_icons.webp";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/login", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login Success");
      return redirect("/profile");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const LoginPage = () => {
  const [isProtect, setIsProtect] = useState(true);
  const handleEye = () => {
    setIsProtect(!isProtect);
  };
  return (
    <section id="login" className="bg-dark-green">
      <Container className="py-5">
        <div className="card__container mx-auto">
          <Card
            className="bg-light p-3 mx-auto text-bg-dark border-0 w-100"
            data-aos="zoom-in"
          >
            <Card.Img
              className="d-block mx-auto my-3"
              style={{ width: "300px" }}
              src={imglogin}
            />
            <Card.Title className="fm-1 text-center fw-bold text-dark-dark">
              Sign to your account
            </Card.Title>
            <Card.Body>
              <Form method="post">
                <div className="mb-3 input-group">
                  <input
                    type="email"
                    name="email"
                    className="fm-2 border-1 bg-white form-control"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="mb-3 d-flex input-group">
                  <input
                    type={isProtect ? "password" : "text"}
                    className="fm-2 bg-white border-end-0  rounded-0 rounded-start form-control"
                    placeholder="Password"
                    name="password"
                  />
                  <Button
                    variant="light"
                    className="bg-white border border-start-0 rounded-0 rounded-end"
                    onClick={handleEye}
                  >
                    <i
                      className={isProtect ? "ri-eye-off-line " : "ri-eye-line"}
                    ></i>
                  </Button>
                </div>
                <div className="mb-3 text-keep input-group">
                  <a
                    href="#"
                    className="fm-2 fs-7 text-link fw-medium  btn-link"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mb-4 fm-3 text-center input-group">
                  <Button
                    type="submit"
                    variant="success"
                    className="border-0 px-5 fw-semibold w-100 btn__login"
                  >
                    Login
                  </Button>
                </div>
                <div className="fm-2 fs-7 text-center d-flex justify-content-center gap-1 align-items-center input-group">
                  <p className="m-0 text-keep">Dont have an account?</p>
                  <Link to="/register" className="btn btn-link btn-sm fs-7">
                    Register
                  </Link>
                </div>
              </Form>
              {/* <div className="d-flex justify-content-center align-items-center gap-3 my-2">
                <hr className="border-secondary w-100" />
                <span className="text-secondary fm-2 fw-medium">OR</span>
                <hr className="border-secondary w-100" />
              </div>
              <Button
                variant="light"
                className="border d-flex justify-content-center fm-2 gap-3 w-100 p-2 text-secondary"
              >
                <img src={IconGoogle} alt="" style={{ width: "25px" }} />
                Login with google account
              </Button> */}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
