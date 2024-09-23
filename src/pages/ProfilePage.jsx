import { useEffect, useState } from "react";
import customAPI from "../api.js";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../components/FormInput.jsx";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, Link, redirect } from "react-router-dom";
import BannerHeader from "../common/Banner/BannerHeader.jsx";
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

const ProfilePage = () => {
  const gender = ["Male", "Female"];
  const [identity, setIdentity] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserProfile = async () => {
    const { data } = await customAPI.get("/auth/getuser");
    setIdentity(data.user);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      await customAPI.put(
        `/auth/users/${identity._id}`,
        {
          name: data.name,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          city: data.city,
          address: data.address,
          image: data.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

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

  return (
    <section id="profile" className="bg-white overflow-hidden">
      <BannerHeader bannerTitle="Your Profile" />
      <Container className="py-3 py-md-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <input
                    type="file"
                    name="image"
                    defaultValue={identity.image}
                    className="form-control form-control-sm w-100 fs-7 fw-bold border rounded"
                  />
                </Card.Body>
                <Card.Footer className="px-0 bg-transparent border-0">
                  <Card.Text className="fs-7">
                    File size: maximum 10,000,000 bytes (10 Megabytes). Allowed
                    file extensions: .JPG, .JPEG, .PNG
                  </Card.Text>
                </Card.Footer>
              </Card>
              {/* <Button variant="base" className="fw-bold w-100 border my-3 p-2">
              <i className="ri-key-fill me-3"></i>Change Password
            </Button> */}
              <div className="d-flex align-items-center gap-2 mt-2 w-100">
                <Button
                  variant="danger"
                  size="sm"
                  className="fw-medium w-100"
                  onClick={handleLogout}
                >
                  <i className="ri-logout-box-line me-2"></i>Logout
                </Button>
                <Link
                  to="/orders"
                  className="btn btn-primary btn-sm fm-2 border w-100"
                >
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
                    <Row md="2" className="g-2">
                      <Col>
                        <FormInput
                          label="First Name:"
                          type="text"
                          name="firstName"
                          placeHolder="Enter your firstname"
                          defaultValue={identity.firstName}
                        />
                      </Col>
                      <Col>
                        <FormInput
                          label="Last Name:"
                          type="text"
                          name="lastName"
                          placeHolder="Enter your lastname"
                          defaultValue={identity.lastName}
                        />
                      </Col>
                    </Row>
                  </Card.Text>
                  <Card.Text className="fs-7 px-3 mb-3">
                    <FormSelect
                      label="Gender:"
                      name="gender"
                      defaultValue={identity.gender}
                      options={gender}
                    />
                  </Card.Text>
                  <Card.Title className="fw-bold border-bottom border-top p-3">
                    Contact
                  </Card.Title>
                  <Card.Text className="fs-7 px-3 mb-2">
                    <Row lg="2" className="g-2">
                      <Col>
                        <FormInput
                          label="Email:"
                          type="email"
                          name="email"
                          placeHolder="Enter your email address"
                          defaultValue={identity.email}
                        />
                      </Col>
                      <Col>
                        <label htmlFor="phone" className="form-label">
                          Phone Number:
                        </label>
                        <input
                          type="number"
                          id="phone"
                          className="form-control form-control-sm"
                          name="phone"
                          minLength={11}
                          maxLength={13}
                          defaultValue={identity.phone}
                          placeholder="Enter your phone number"
                        />
                      </Col>
                      <Col lg="12">
                        <FormInput
                          label="City:"
                          type="text"
                          name="city"
                          placeHolder="Enter your city"
                          defaultValue={identity.city}
                        />
                      </Col>
                      <Col lg="12">
                        <FormTextarea
                          label="Address:"
                          name="address"
                          placeHolder="Enter your address"
                          defaultValue={identity.address}
                          Row={3}
                        />
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="fm-2 d-flex gap-2">
                  <Button type="submit" variant="success">
                    <i className="ri-save-3-line me-2"></i>
                    Save
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default ProfilePage;
