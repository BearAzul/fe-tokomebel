import { useState } from "react";
import { useNavigation, redirect, useLoaderData, Form } from "react-router-dom";
import customAPI from "../../../api.js";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../../components/FormInput";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { EditCustomerDirect } from "../../../components/Directlink.jsx";
import ZoomModal from "../../../components/ZoomModal.jsx";
import Loading from "../../../components/Loading.jsx";
import BlankImages from "../../../assets/Image/blank_user.png"

export const loader = async ({ params }) => {
  try {
    const { data } = await customAPI.get(`/auth/users/${params.id}`);
    return { customer: data.data };
  } catch (error) {
    toast.error("Gagal mengambil data pelanggan.");
    return redirect("/admin/customers");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customAPI.put(`/auth/users/${params.id}`, data);
    toast.success("Data pelanggan berhasil diperbarui");
    return redirect(`/admin/customers/${params.id}/edit`);
  } catch (error) {
    toast.error(error.response?.data?.message || "Gagal memperbarui data.");
    return null;
  }
};

const EditCustomersView = () => {
  const [showZoom, setShowZoom] = useState(false);

  const handleOpen = () => setShowZoom(true);
  const handleClose = () => setShowZoom(false);

  const { customer } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const profile = customer.profile || {};

  const [customerGender, setCustomerGender] = useState({
    gender: profile.gender
  });

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

  if (!customer) {
    return <Loading />;
  }
  return (
    <section className="fm-2">
      <Container>
        <EditCustomerDirect />
        <h5 className="my-3">Edit Profil Pelanggan</h5>

        <Form
          className="border border-secondary rounded p-3"
          method="post"
          encType="multipart/form-data"
        >
          <Row lg="2" md="2" xs="1" className="g-3">
            <Col lg="2" md="4">
              <Image src={!profile.image ? BlankImages : profile.image} rounded thumbnail alt="Image User" className="d-block mx-auto object-fit-cover" style={{ width: "150px", height: "150px" }} onClick={handleOpen} />
            </Col>
            <Col lg="10" md="8">
              <Row lg="2" md="2" xs="1" className="g-3">
                <Col>
                  <FormInput
                    name="firstName"
                    type="text"
                    label="Nama Depan:"
                    placeHolder="Masukkan Nama Depan Pelanggan"
                    defaultValue={customer.firstName}
                    disabled
                    readOnly
                  />
                </Col>
                <Col>
                  <FormInput
                    name="lastName"
                    type="text"
                    label="Nama Belakang:"
                    placeHolder="Masukkan Nama Belakang Pelanggan"
                    defaultValue={customer.lastName}
                    disabled
                    readOnly
                  />
                </Col>
                <Col lg="12" md="12">
                  <FormInput
                    name="email"
                    type="email"
                    label="Email:"
                    placeHolder="Masukkan Email Valid Pelanggan"
                    readOnly
                    disabled
                    defaultValue={customer.email}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row xs="1" lg="3" md="2" className="g-3 mt-2">
            <Col>
              <FormSelect
                name="gender"
                label="Jenis Kelamin:"
                value={customerGender.gender}
                onChange={(e) =>
                  setCustomerGender((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                options={gender}
              />
            </Col>
            <Col>
              <FormInput
                name="phone"
                type="number"
                label="No. Telp:"
                placeHolder="Masukkan No. Telp Pelanggan"
                readOnly
                disabled
                defaultValue={profile.phone}
              />
            </Col>
            <Col md="12">
              <FormInput
                name="city"
                type="text"
                label="Kabupaten/Kota:"
                placeHolder="Masukkan Kabupaten/Kota Pelanggan"
                defaultValue={profile.city}
              />
            </Col>
            <Col md="12" lg="12">
              <FormTextarea
                name="address"
                label="Alamat Lengkap:"
                placeHolder="Masukkan Alamat Lengkap Pelanggan"
                defaultValue={profile.address}
                Row={3}
              />
            </Col>
          </Row>
          <div className="d-flex gap-2 align-items-center mt-3">
            <Button
              type="submit"
              variant="success"
              size="sm"
              className="px-4"
              disabled={isSubmitting}
            >
           
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Memperbarui...
                </>
              ) : (
                <>
                  <i className="ri-save-line me-2"></i>
                  Update
                </>
              )}
            </Button>
          </div>
        </Form>

        <ZoomModal
          show={showZoom}
          onHide={handleClose}
          imageUrl={profile.image}
          altText={`Gambar profil ${customer.firstName}`}
        />
      </Container>
    </section>
  );
};

export default EditCustomersView;
