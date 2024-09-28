import jsPDF from "jspdf";
import "jspdf-autotable"; // Plugin tambahan untuk membuat tabel otomatis

export const exportPDF = (data) => {
  const doc = new jsPDF();

  doc.text("Data Customers Toko Mebel ", 20, 10);

  const tableColumn = ["No.", "Name", "Email", "No. Telp", "Gender", "City", "Address"];
  const tableRows = [];

  data.forEach((customer, index) => {
    const customerData = [
      index + 1,
      `${customer.firstName} ${customer.lastName}`,
      customer.email,
      customer.phone,
      customer.gender,
      customer.city,
      customer.address,
    ];
    tableRows.push(customerData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20, 
  });

  doc.save("customer_data.pdf");
};

