import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customAPI from "../../../api.js";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { EditCustomerDirect } from "../../../components/Directlink.jsx";
import Loading from "../../../components/Loading.jsx";

const EditCustomersView = () => {
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
  const [customer, setCustomer] = useState([]);

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
  return (
    <section className="fm-2">
      <Container>
        <EditCustomerDirect />
        <h5 className="my-3">Edit Profil Pelanggan</h5>
        {customer ? (
          <form
            className="border border-secondary rounded p-3"
            onSubmit={handleUpdate}
            encType="multipart/form-data"
          >
            <Row lg="3" xs="1" md="2" className="g-3">
              <Col xs="6">
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
              <Col xs="6">
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
              <Col>
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
        ) : (
          <Loading />
        )}
      </Container>
    </section>
  );
};

export default EditCustomersView;
