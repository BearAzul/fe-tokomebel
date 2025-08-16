import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
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
      <section className="fm-2" id="adminview">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="text-white-50" />
          <h5 className="mb-3">Profil Admin</h5>
          <form onSubmit={handleUpdate} className="border border-secondary rounded p-3" encType="multipart/form-data">
            <Row className="g-4">
              <Col md="4">
                <div className="mb-3">
                  <label className="form-label">Foto Profil:</label>
                  <div className="ratio ratio-1x1 border border-secondary rounded-2 d-flex align-items-center justify-content-center text-bg-dark">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Preview" className="object-fit-cover w-100 h-100" rounded />
                    ) : (
                      <div className="text-center d-flex flex-column align-items-center justify-content-center">
                        <i className="ri-user-line fs-1"></i>
                        <p className="mt-2">Tidak Ada Foto</p>
                      </div>
                    )}
                  </div>
                </div>
                <Button type="button" variant="outline-secondary" className="w-100" onClick={() => document.getElementById('imageUpload').click()}>
                  Ubah Foto
                </Button>
                <input id="imageUpload" name="image" type="file" className="d-none" accept="image/*" onChange={handleImageChange} />
              </Col>
              <Col md="8">
                <Row className="g-3">
                  <Col md={6}>
                    <FormInput
                      name="firstName" type="text" label="Nama Depan:"
                      defaultValue={currentUser.firstName}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="lastName" type="text" label="Nama Belakang:"
                      defaultValue={currentUser.lastName}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="email" type="email" label="Email:" readOnly
                      defaultValue={currentUser.email}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="phone" type="number" label="No. Telp:"
                      defaultValue={profile.phone}
                    />
                  </Col>
                  <Col md={6}>
                    <FormSelect
                      name="gender" label="Jenis Kelamin:"
                      defaultValue={profile.gender}
                      options={[{ value: "", label: "Pilih Jenis Kelamin" }, { value: "Laki-Laki", label: "Laki-Laki" }, { value: "Perempuan", label: "Perempuan" }]}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="city" type="text" label="Kabupaten/Kota:"
                      defaultValue={profile.city}
                    />
                  </Col>
                  <Col xs={12}>
                    <FormTextarea
                      name="address" label="Alamat Lengkap:"
                      Row={6} defaultValue={profile.address}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex gap-2 align-items-center mt-3">
              <Button
                variant="success"
                size="sm"
                type="submit"
                className="px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Memperbarui...
                  </>
                ) : (
                  <>
                    <i className="ri-save-3-line me-2"></i>
                    Update Profil
                  </>
                )}
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default UserView;
