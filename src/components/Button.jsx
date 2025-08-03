import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../features/userSlice.js"
import { useDispatch } from "react-redux"
import { clearCartItem } from "../features/cartSlice.js"
import customAPI from "../api.js"
import { Dropdown, DropdownButton } from "react-bootstrap"
import { googleLogout } from "@react-oauth/google";
import ExportCSV from "../components/export/exportCSV.jsx";
import { generatePDF } from "../components/export/exportPDF.jsx";
import { formatDataForExport, formatOrderDataForExport, headers, orderHeaders } from "../utils/ExportUtils.jsx";
import { CSVLink } from 'react-csv';

export const ProfileButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      googleLogout()
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/login");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/login");
    }
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="text-decoration-none text-white p-0 border-0"
        id="dropdown-user"
      >
        <i className="ri-user-fill fs-6"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          <i className="ri-user-line me-2"></i> Profil
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>
          <i className="ri-logout-box-line me-2"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export const ExportCustomers = ({ data }) => {
  const formattedData = formatDataForExport(data);

  const handleExportPDF = () => {
    generatePDF(headers, formattedData, "Data Pelanggan - Toko Mebel Amanah");
  };

  return (
    <DropdownButton
      id="export-dropdown"
      title={
        <>
          <i className="ri-download-2-line me-1"></i> Export Data
        </>
      }
      variant="outline-light"
      size="sm"
    >

      <Dropdown.Item onClick={handleExportPDF}>
        <i className="ri-file-pdf-2-line me-2"></i>
        Export as PDF
      </Dropdown.Item>

      <ExportCSV formattedData={formattedData} headers={headers} />

    </DropdownButton>
  );
};

export const ExportOrders = ({ data }) => {
  const formattedData = formatOrderDataForExport(data);

  const handleExportPDF = () => {
    generatePDF(orderHeaders, formattedData, "Data Pesanan - Toko Mebel Amanah");
  };

  return (
    <DropdownButton
      id="order-export-dropdown"
      title={
        <>
          <i className="ri-download-2-line me-1"></i> Export Pesanan
        </>
      }
      variant="outline-light"
      size="sm"
    >

      <Dropdown.Item onClick={handleExportPDF}>
        <i className="ri-file-pdf-2-line me-2"></i>
        Export as PDF
      </Dropdown.Item>

      <Dropdown.Item as="div" style={{ padding: 0 }}>
        <CSVLink
          data={formattedData}
          headers={orderHeaders}
          filename={"data_pesanan.csv"}
          className="dropdown-item"
          style={{ textDecoration: 'none', display: 'block', padding: '0.25rem 1rem' }}
        >
          <i className="ri-file-excel-line me-2"></i>
          Export as CSV
        </CSVLink>
      </Dropdown.Item>

    </DropdownButton>
  );
};
