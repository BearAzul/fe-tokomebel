import customAPI from "../api.js";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../components/FormInput.jsx";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useNavigate,
  Link,
  redirect,
  useRevalidator,
  useLoaderData,
} from "react-router-dom";
import BannerHeader from "../common/Banner/BannerHeader.jsx";
import { clearCartItem } from "../features/cartSlice.js";
import { logoutUser } from "../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDirect } from "../components/Directlink.jsx";
import { useState } from "react";
import BlankImages from "../assets/Image/blank_user.png";
import { HelmetHead } from "../common/Helmet.jsx";
import { googleLogout } from "@react-oauth/google";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;

  if (!user) {
    toast.warn("Silahkan Login untuk akses halaman Profil");
    return redirect("/login");
  }

  const { data } = await customAPI.get("/auth/getuser");
  const currentUser = data.user;

  return { currentUser };
};

const ProfilePage = () => {
  const user = useSelector((state) => state.userState.user);
  const [edit, setEdit] = useState(false);
  const { currentUser } = useLoaderData();

  const [information, setInformation] = useState({
    gender: currentUser.gender,
  })
  
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
  const { revalidate } = useRevalidator();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      await customAPI.put(
        `/auth/users/${user._id}`,
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
      revalidate();
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      googleLogout()
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

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <>
      <HelmetHead
        title="Profil Pengguna"
        description="Kelola informasi akun Anda di halaman Profil. Ubah data pribadi, alamat pengiriman, dan lihat histori aktivitas Anda."
        link="/profile"
      />
      <section
        id="profile"
        className="bg-white overflow-hidden bg-body-secondary"
      >
        <BannerHeader bannerTitle="PROFIL" />
        <Container className="py-3 py-md-5">
          <ProfileDirect />
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row lg="2" className="g-2">
              <Col lg="4">
                <Card className="fm-2 p-3">
                  <Card.Img
                    variant="top"
                    src={currentUser.image === null ? BlankImages : currentUser.image}
                    className="d-block rounded mx-auto object-fit-cover"
                  />
                  <Card.Body className="px-0">
                    <input
                      type="file"
                      name="image"
                      className="form-control form-control-sm w-100 fs-7 fw-bold border rounded"
                      disabled={!edit}
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

                {currentUser.role === "owner" ? (
                  <Link to="/admin" className="btn btn-dark w-100 fm-2 mt-2">
                    Dashboard Admin
                  </Link>
                ) : (
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
                      Riwayat Pesanan
                    </Link>
                  </div>
                )}
              </Col>
              <Col lg="8">
                <Card>
                  <Card.Body className="fm-2 p-0">
                    <Card.Title className="fw-bold border-bottom p-3 bg-dark-green text-white rounded-top-2">
                      Informasi Pribadi
                    </Card.Title>
                    <div className="fs-7 px-3 mb-2">
                      <Row md="2" className="g-2">
                        <Col>
                          <FormInput
                            label="Nama Depan:"
                            type="text"
                            name="firstName"
                            placeHolder="Masukkan Nama Depan Anda"
                            defaultValue={currentUser.firstName}
                            disabled={!edit}
                          />
                        </Col>
                        <Col>
                          <FormInput
                            label="Nama Belakang:"
                            type="text"
                            name="lastName"
                            placeHolder="Masukkan Nama Belakang Anda"
                            defaultValue={currentUser.lastName}
                            disabled={!edit}
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="fs-7 px-3 mb-3">
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
                        disabled={!edit}
                      />
                    </div>
                    <div className="fs-7 px-3 mb-2">
                      <Row lg="2" className="g-2">
                        <Col>
                          <FormInput
                            label="Email:"
                            type="email"
                            name="email"
                            placeHolder="Masukkan Email Valid Anda"
                            defaultValue={currentUser.email}
                            disabled={true}
                          />
                        </Col>
                        <Col>
                          <label htmlFor="phone" className="form-label">
                            No. Telepon: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="phone"
                            className="form-control form-control-sm"
                            name="phone"
                            minLength={11}
                            maxLength={13}
                            defaultValue={currentUser.phone}
                            placeholder="Masukkan No. Telp Anda"
                            disabled={!edit}
                          />
                        </Col>
                        <Col lg="12">
                          <FormInput
                            label="Kabupaten/Kota:"
                            type="text"
                            name="city"
                            placeHolder="Masukkan Kabupaten/Kota Anda"
                            defaultValue={currentUser.city}
                            disabled={!edit}
                          />
                        </Col>
                        <Col lg="12">
                          <FormTextarea
                            label="Alamat Lengkap:"
                            name="address"
                            placeHolder="Masukkan Alamat Lengkap Anda"
                            defaultValue={currentUser.address}
                            Row={3}
                            disabled={!edit}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                  <Card.Footer className="fm-2 d-flex gap-2">
                    {!edit ? (
                      <Button
                        type="button"
                        variant="warning"
                        onClick={handleEdit}
                        size="sm"
                      >
                        <i className="ri-edit-circle-fill me-2"></i>
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={handleCancel}
                          size="sm"
                        >
                          <i className="ri-close-circle-line me-2"></i>
                          Cancel
                        </Button>
                        <Button type="submit" variant="success" size="sm">
                          <i className="ri-save-3-line me-2"></i>
                          Save
                        </Button>
                      </>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </form>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
