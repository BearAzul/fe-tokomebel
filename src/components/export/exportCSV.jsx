
import { CSVLink } from "react-csv";
import {Button} from "react-bootstrap"

const exportCSV = ({ data }) => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "No. Telp", key: "phone" },
    { label: "Gender", key: "gender" },
    { label: "City", key: "city" },
    { label: "Address", key: "address" },
  ];

  const csvData = data.map((customer) => ({
    id: customer._id,
    fullName: `${customer.firstName} ${customer.lastName}`,
    email: customer.email,
    phone: customer.phone,
    gender: customer.gender,
    city: customer.city,
    address: customer.address,
  }));

  return (
    <CSVLink data={csvData} headers={headers} filename={"customer_data.csv"}>
      <Button
        variant="success"
        size="sm"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Download CSV"
      >
        <i className="ri-file-excel-line"></i>
      </Button>
    </CSVLink>
  );
};

export default exportCSV;
