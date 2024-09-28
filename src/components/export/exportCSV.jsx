
import { CSVLink } from "react-csv";
import {Button} from "react-bootstrap"

const exportCSV = ({ data }) => {
  const headers = [
    { label: "ID", key: "_id" },
    { label: "Name", key: `${data.firstName} ${data.lastName}` },
    { label: "Email", key: "email" },
    { label: "No. Telp", key: "phone" },
    { label: "Gender", key: "gender" },
    { label: "City", key: "city" },
    { label: "Address", key: "address" },
  ];

  return (
    <CSVLink data={data} headers={headers} filename={"customer_data.csv"}>
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
