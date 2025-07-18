import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../components/FormInput";
import { toast } from "react-toastify";
import customAPI from "../../api.js";
import { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import BlankImages from "../../assets/Image/blank_user.png"
import { HelmetHead } from "../../common/Helmet.jsx";

export const loader = async () => {
  try {
    const { data } = await customAPI.get("/auth/getuser");
    return { currentUser: data.user };
  } catch (error) {
    toast.error("Gagal memuat profil");
    return redirect("/login");
  };
};

const UserView = () => {
  const { currentUser } = useLoaderData();
  const profile = currentUser.profile || {}
  const [information, setInformation] = useState({
    gender: profile.gender,
  })

  const [loading, setLoading] = useState(false);

  const gender = [
    {
      key: 1,
      value: "Laki-Laki",
      label: "Laki-Laki",
    },
    {
      key: 2,
      value: "Perempuan",
      label: "Perempuan",
    },
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    setLoading(true);

    try {
      await customAPI.put(
        `/auth/users/${currentUser._id}`,
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HelmetHead title="Profil" />
      <section className="fm-2">
        <Container>
          <h5 className="mb-3">Profil Admin</h5>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <Card className="border border-secondary text-bg-dark p-4">
              <div className="d-flex gap-3 align-items-start flex-wrap mb-3 mb-md-0">
                <figure
                  className="overflow-hidden rounded border border-2 border-secondary mx-auto mx-md-0 bg-secondary"
                  style={{ width: "120px", height: "120px" }}
                >
                  <img
                    src={!profile.image ? BlankImages : profile.image}
                    alt=""
                    className="w-100 h-100 d-block object-fit-cover"
                  />
                </figure>
                <div>
                  <h5>{`${currentUser.firstName} ${currentUser.lastName}`}</h5>
                  <input
                    type="file"
                    name="image"
                    className="form-control form-control-sm mt-3"
                  />
                </div>
              </div>
              <hr />
              <Row lg="3" md="2" xs="1" className="g-3">
                <Col>
                  <FormInput
                    name="firstName"
                    type="text"
                    label="Nama Depan:"
                    placeHolder="Masukkan Nama Depan"
                    defaultValue={currentUser.firstName}
                  />
                </Col>
                <Col>
                  <FormInput
                    name="lastName"
                    type="text"
                    label="Nama Belakang:"
                    placeHolder="Enter Your Last Name"
                    defaultValue={currentUser.lastName}
                  />
                </Col>
                <Col>
                  <label htmlFor="phone" className="form-label">
                    No. Telp: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="form-control form-control-sm"
                    name="phone"
                    minLength={11}
                    maxLength={13}
                    defaultValue={profile.phone}
                    placeholder="Masukkan No. Telp (+62)"
                  />
                </Col>
                <Col>
                  <FormInput
                    name="email"
                    type="email"
                    label="Email:"
                    placeHolder="Masukkan Email Valid"
                    defaultValue={currentUser.email}
                  />
                </Col>
                <Col>
                  <FormSelect
                    name="gender"
                    label="Jenis Kelamin:"
                    value={information.gender}
                    onChange={(e) =>
                      setInformation((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    options={gender}
                  />
                </Col>
                <Col>
                  <FormInput
                    name="city"
                    type="text"
                    label="Kabupaten/Kota:"
                    placeHolder="Masukkan Kabupaten/Kota"
                    defaultValue={profile.city}
                  />
                </Col>
                <Col md="12" lg="12">
                  <FormTextarea
                    name="address"
                    label="Alamat Lengkap:"
                    placeHolder="Masukkan Alamat Lengkap"
                    Row={3}
                    defaultValue={profile.address}
                  />
                </Col>
              </Row>
              <Button
                variant="success"
                size="sm"
                type="submit"
                className="max-content px-3 mt-3"
                disabled={loading}
              >
                {loading ? (<>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>) : (<>
                  <i className="ri-save-3-line me-2"></i>
                  Update Profile
                </>)}
              </Button>
            </Card>
          </form>
        </Container>
      </section>
    </>
  );
};

export default UserView;
