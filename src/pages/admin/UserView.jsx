import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../components/FormInput";
import { toast } from "react-toastify"
import customAPI from "../../api.js";
import { useEffect, useState } from "react"
import {redirect} from "react-router-dom"

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan Login untuk akses halaman Profil");
    return redirect("/login");
  }
  return null;
};

const UserView = () => {
  const gender = ["Male", "Female"];
  const [identity, setIdentity] = useState("");

  const getUserProfile = async () => {
    const { data } = await customAPI.get("/auth/getuser");
    setIdentity(data.user);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleUpdate = async (e) => {
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
  return (
    <section className="fm-2">
      <Container>
        <h5 className="mb-3">Admin Profile</h5>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <Card className="border border-secondary text-bg-dark p-4">
            <div className="d-flex gap-3 align-items-start flex-wrap mb-3 mb-md-0">
              <figure
                className="overflow-hidden rounded border border-2 border-secondary mx-auto mx-md-0"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={
                    identity.image === null
                      ? "https://via.placeholder.com/200x200"
                      : identity.image
                  }
                  alt=""
                  className="w-100 h-100 d-block object-fit-cover"
                />
              </figure>
              <div>
                <h5>{`${identity.firstName} ${identity.lastName}`}</h5>
                <input
                  type="file"
                  name="image"
                  className="form-control form-control-sm mt-3"
                />
              </div>
            </div>
            <hr />
            <Row lg="3" md="2" xs="1" className="g-3">
              <Col xs="6">
                <FormInput
                  name="firstName"
                  type="text"
                  label="First Name:"
                  placeHolder="Enter Your First Name"
                  defaultValue={identity.firstName}
                />
              </Col>
              <Col xs="6">
                <FormInput
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeHolder="Enter Your Last Name"
                  defaultValue={identity.lastName}
                />
              </Col>
              <Col>
                <label htmlFor="phone" className="form-label">
                  Phone:
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
              <Col>
                <FormInput
                  name="email"
                  type="email"
                  label="Email"
                  placeHolder="Enter Your Email Address"
                  defaultValue={identity.email}
                />
              </Col>
              <Col xs="6">
                <FormSelect
                  name="gender"
                  label="Gender:"
                  options={gender}
                  defaultValue={identity.gender}
                />
              </Col>
              <Col xs="6">
                <FormInput
                  name="city"
                  type="text"
                  label="City:"
                  placeHolder="Enter Your City"
                  defaultValue={identity.city}
                />
              </Col>
              <Col lg="12">
                <FormTextarea
                  name="address"
                  label="Address:"
                  placeHolder="Enter Your Address"
                  Row={3}
                  defaultValue={identity.address}
                />
              </Col>
            </Row>
            <Button
              variant="success"
              size="sm"
              type="submit"
              className="max-content px-3 mt-3"
            >
              <i className="ri-save-3-line me-2"></i>
              Update Profile
            </Button>
          </Card>
        </form>
      </Container>
    </section>
  );
};

export default UserView;
