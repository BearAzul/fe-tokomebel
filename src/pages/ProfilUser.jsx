import "../styles/index.css";
import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate, useNavigation, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import customAPI from "../api.js";
import Loading from "../components/Loading.jsx";
import { clearCartItem } from "../features/cartSlice.js";
import { logoutUser } from "../features/userSlice.js";
import { useDispatch } from "react-redux";

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan Login untuk akses halaman Profil");
    return redirect("/login");
  }
  return null;
};

const ProfilUser = () => {
  const [identity, setIdentity] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    image: null,
    address: "",
  });

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/login");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/login");
    }
  };

  const GetCustomers = async () => {
    try {
      const response = await customAPI.get("/auth/getuser");
      setIdentity(response.data.user);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch customer data."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setIdentity({ ...identity, image: files[0] });
    } else {
      setIdentity({ ...identity, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in identity) {
      if (identity[key] !== null) {
        formData.append(key, identity[key]);
      }
    }

    try {
      const response = await customAPI.put(
        `/auth/users/${identity._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      GetCustomers();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update customer data."
      );
    }
  };

  useEffect(() => {
    GetCustomers();
  }, []);

  return (
    <section id="profile" className="bg-white overflow-hidden">
      <BannerHeader bannerTitle="Your Profile" />
      <Container className="py-3 py-md-5">
        {isPageLoading ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row lg="2" className="g-2">
              <Col lg="4">
                <Card className="fm-2 p-3">
                  <Card.Img
                    variant="top"
                    src={
                      identity.image === null
                        ? "https://via.placeholder.com/200x200"
                        : identity.image
                    }
                    className="d-block rounded mx-auto object-fit-cover"
                  />
                  <Card.Body className="px-0">
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="w-100 fs-7 fw-bold border rounded"
                    />
                  </Card.Body>
                  <Card.Footer className="px-0 bg-transparent border-0">
                    <Card.Text className="fs-7">
                      File size: maximum 10,000,000 bytes (10 Megabytes).
                      Allowed file extensions: .JPG, .JPEG, .PNG
                    </Card.Text>
                  </Card.Footer>
                </Card>
                {/* <Button variant="base" className="fw-bold w-100 border my-3 p-2">
              <i className="ri-key-fill me-3"></i>Change Password
            </Button> */}
                <div className="d-flex align-items-center gap-2 mt-2 w-100">
                  <Button
                    variant="danger"
                    className="fw-medium w-100"
                    onClick={handleLogout}
                  >
                    <i className="ri-logout-box-line me-2"></i>Logout
                    </Button>
                    <Link to="/orders" className="btn btn-primary fm-2 border w-100">
                      Order History
                    </Link>
                </div>
              </Col>
              <Col lg="8">
                <Card>
                  <Card.Body className="fm-2 p-0">
                    <Card.Title className="fw-bold border-bottom p-3">
                      Personal Information
                    </Card.Title>
                    <Card.Text className="fs-7 px-3 mb-2">
                      <Row xs="1" md="2" className="g-2">
                        <Col>
                          <Form.Label
                            htmlFor="firstName"
                            className="form-label fs-6"
                          >
                            First Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            value={identity.firstName}
                            placeholder="Enter your first name"
                          />
                        </Col>
                        <Col>
                          <Form.Label
                            htmlFor="lastName"
                            className="form-label fs-6"
                          >
                            Last Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            value={identity.lastName}
                            placeholder="Enter your last name"
                          />
                        </Col>
                      </Row>
                    </Card.Text>
                    <Card.Text className="fs-7 px-3 mb-3">
                      <Form.Label htmlFor="gender" className="form-label fs-6">
                        Gender:
                      </Form.Label>
                      <Form.Select
                        name="gender"
                        onChange={handleChange}
                        value={identity.gender}
                      >
                        <option>Choose gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Card.Text>
                    <Card.Title className="fw-bold border-bottom border-top p-3">
                      Contact
                    </Card.Title>
                    <Card.Text className="fs-7 px-3 mb-2">
                      <Form.Label htmlFor="email" className="form-label fs-6">
                        Email:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={identity.email}
                        placeholder="Enter your email address"
                      />
                    </Card.Text>
                    <Card.Text className="fs-7 px-3 mb-2">
                      <Form.Label htmlFor="phone" className="form-label fs-6">
                        Phone Number:
                      </Form.Label>
                      <Form.Control
                        type="number"
                        id="phone"
                        name="phone"
                        minLength={11}
                        maxLength={13}
                        onChange={handleChange}
                        value={identity.phone}
                        placeholder="Enter your phone number"
                      />
                    </Card.Text>
                    <Card.Text className="fs-7 px-3 mb-2">
                      <Form.Label htmlFor="city" className="form-label fs-6">
                        City:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="city"
                        name="city"
                        onChange={handleChange}
                        value={identity.city}
                        placeholder="Enter your city"
                      />
                    </Card.Text>
                    <Card.Text className="fs-7 px-3 pb-3">
                      <Form.Label htmlFor="address" className="form-label fs-6">
                        Address:
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        id="address"
                        name="address"
                        onChange={handleChange}
                        value={identity.address}
                        placeholder="Enter your address"
                      />
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="fm-2 d-flex gap-2">
                    <Button type="submit" variant="success">
                      Save
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </section>
  );
};

export default ProfilUser;
