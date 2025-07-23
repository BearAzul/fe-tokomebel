import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../components/FormInput";
import { toast } from "react-toastify";
import customAPI from "../../api.js";
import { useState, useEffect } from "react";
import { redirect, useLoaderData, useRevalidator } from "react-router-dom";
import { HelmetHead } from "../../common/Helmet.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

const breadcrumbItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Profil Admin" },
];


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
  const { revalidate } = useRevalidator();

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentUser.profile?.image);

  const profile = currentUser.profile || {};

  useEffect(() => {
    setImagePreview(profile?.image || `https://ui-avatars.com/api/?name=${currentUser.firstName}${currentUser.lastName}&background=random`);
  }, [currentUser, profile?.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setLoading(true);

    try {
      let imageUrl = profile.image;

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const { data: uploadData } = await customAPI.post("/auth/upload-profile-image", imageFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadData.url;
      }

      const updatedProfileData = Object.fromEntries(formData);
      delete updatedProfileData.image;

      await customAPI.put(`/auth/users/${currentUser._id}`, {
        ...updatedProfileData,
        image: imageUrl,
      });

      toast.success("Profile updated successfully!");
      revalidate();
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
          <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
          <h5 className="mb-3">Profil Admin</h5>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <Card className="border border-secondary text-bg-dark p-4">
              <div className="d-flex gap-3 align-items-start flex-wrap mb-3 mb-md-0">
                <figure
                  className="overflow-hidden rounded border border-2 border-secondary mx-auto mx-md-0 bg-secondary"
                  style={{ width: "120px", height: "120px" }}
                >
                  <img
                    src={imagePreview}
                    alt={currentUser.firstName}
                    className="w-100 h-100 d-block object-fit-cover"
                  />
                </figure>
                <div>
                  <h5>{`${currentUser.firstName} ${currentUser.lastName}`}</h5>
                  <input
                    type="file"
                    name="image"
                    className="form-control form-control-sm mt-3"
                    onChange={handleImageChange}
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
                  <FormInput
                    name="phone"
                    type="number"
                    label="No. Telp:"
                    placeHolder="Masukkan No. Telp (+62)"
                    defaultValue={profile.phone} />
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
                    defaultValue={profile.gender}
                    options={[{ value: "Laki-Laki", label: "Laki-Laki" }, { value: "Perempuan", label: "Perempuan" }]}
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
