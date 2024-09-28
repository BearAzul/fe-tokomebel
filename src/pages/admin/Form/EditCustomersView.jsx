import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import customAPI from "../../../api.js";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../../components/FormInput";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading.jsx";

const EditCustomersView = () => {
  const genders = ["Male", "Female"];
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
        <Link to="/admin/customers" className="btn btn-primary btn-sm">
          <i className="ri-arrow-left-circle-line me-1"></i>
          Back
        </Link>
        <h5 className="my-3">Edit a Customer Data</h5>
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
                  label="First Name:"
                  placeHolder="Enter Customer First Name"
                  defaultValue={customer.firstName}
                />
              </Col>
              <Col xs="6">
                <FormInput
                  name="lastName"
                  type="text"
                  label="Last Name:"
                  placeHolder="Enter Customer Last Name"
                  defaultValue={customer.lastName}
                />
              </Col>
              <Col>
                <FormInput
                  name="phone"
                  type="number"
                  label="No. Telp:"
                  placeHolder="Enter Customer Phone"
                  readOnly
                  defaultValue={customer.phone}
                />
              </Col>
              <Col>
                <FormInput
                  name="email"
                  type="email"
                  label="Email:"
                  placeHolder="Enter Customer Email"
                  readOnly
                  defaultValue={customer.email}
                />
              </Col>
              <Col>
                <FormSelect
                  name="gender"
                  label="Gender:"
                  defaultValue={customer.gender}
                  options={genders}
                />
              </Col>
              <Col>
                <FormInput
                  name="city"
                  type="text"
                  label="City:"
                  placeHolder="Enter Customer City"
                  defaultValue={customer.city}
                />
              </Col>
              <Col md="12" lg="12">
                <FormTextarea
                  name="address"
                  label="Address:"
                  placeHolder="Enter Customer Address"
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
