import { CSVLink } from "react-csv";

const ExportCSV = ({ formattedData, headers }) => {
  return (
    <CSVLink
      data={formattedData}
      headers={headers}
      filename={"data_pelanggan.csv"}
      className="dropdown-item"
      style={{ textDecoration: 'none' }}
    >
      <i className="ri-file-excel-line me-2"></i>
      Export as CSV
    </CSVLink>
  );
};

export default ExportCSV;