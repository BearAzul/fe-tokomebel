
import { CSVLink } from "react-csv";
import {Button} from "react-bootstrap"

const exportCSV = ({ data }) => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Nama Lengkap", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "No. Telp", key: "phone" },
    { label: "Jenis Kelamin", key: "gender" },
    { label: "Kabupaten/Kota", key: "city" },
    { label: "Alamat", key: "address" },
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
        variant="outline-light"
        size="sm"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Download CSV"
        aria-label="Export"
      >
        <i className="ri-file-excel-line"></i>
      </Button>
    </CSVLink>
  );
};

export default exportCSV;
