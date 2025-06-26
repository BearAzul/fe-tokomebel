import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customAPI from "../../../api.js";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../../components/FormInput";
import { Container, Row, Col, Button, Image, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { EditCustomerDirect } from "../../../components/Directlink.jsx";
import ZoomModal from "../../../components/ZoomModal.jsx";
import Loading from "../../../components/Loading.jsx";
import BlankImages from "../../../assets/Image/blank_user.png"

const EditCustomersView = () => {
  const [customer, setCustomer] = useState([]);
  const [showZoom, setShowZoom] = useState(false);

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

  const handleOpen = () => setShowZoom(true);
  const handleClose = () => setShowZoom(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const getCustomer = async () => {
    const { data } = await customAPI.get(`/auth/users/${id}`);
    setCustomer(data.data);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      await customAPI.put(`/auth/users/${id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        city: data.city,
        address: data.address,
      });

      toast.success("Update Customer Data Successfully");
      navigate("/admin/customers");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  if (!customer) {
    return <Loading />;
  }
  return (
    <section className="fm-2">
      <Container>
        <EditCustomerDirect />
        <h5 className="my-3">Edit Profil Pelanggan</h5>

        <form
          className="border border-secondary rounded p-3"
          onSubmit={handleUpdate}
          encType="multipart/form-data"
        >
          <Row lg="2" md="2" xs="1" className="g-3">
            <Col lg="2" md="4">
              <Image src={customer.image === null ? BlankImages : customer.image} rounded thumbnail alt="Image User" className="d-block mx-auto object-fit-cover" style={{ width: "150px", height: "150px" }} onClick={handleOpen} />
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
                value={customer.gender}
                onChange={(e) =>
                  setCustomer((prev) => ({
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
                defaultValue={customer.phone}
              />
            </Col>
            <Col md="12">
              <FormInput
                name="city"
                type="text"
                label="Kabupaten/Kota:"
                placeHolder="Masukkan Kabupaten/Kota Pelanggan"
                defaultValue={customer.city}
              />
            </Col>
            <Col md="12" lg="12">
              <FormTextarea
                name="address"
                label="Alamat Lengkap:"
                placeHolder="Masukkan Alamat Lengkap Pelanggan"
                defaultValue={customer.address}
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
            >
              <i className="ri-add-circle-line me-1"></i>
              Update
            </Button>
          </div>
        </form>

        <ZoomModal
          show={showZoom}
          onHide={handleClose}
          imageUrl={customer.image}
          altText={`Gambar profil ${customer.firstName}`}
        />
      </Container>
    </section>
  );
};

export default EditCustomersView;
