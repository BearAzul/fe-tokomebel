import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatToIDR, formatTanggalWaktu } from "./index.jsx";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 14, 22);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Toko Mebel Amanah", 14, 32);
  doc.text("Jl. Plebean Rt.04/Rw.04 Plelen", 14, 37);
  doc.text("Kec. Gringsing, Kab. Batang, Jawa Tengah", 14, 42);
  doc.text("Jawa Tengah, Indonesia", 14, 47);

  doc.setFontSize(12);
  doc.text("Invoice ID:", 115, 22);
  doc.setFont("helvetica", "bold");
  doc.text(`#${order._id}`, 140, 22);

  doc.setFont("helvetica", "normal");
  doc.text("Tanggal:", 115, 28);
  doc.text(formatTanggalWaktu(order.createdAt), 140, 28);

  doc.setLineWidth(0.5);
  doc.line(14, 53, 196, 53);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Ditagihkan kepada:", 14, 63);
  doc.setFont("helvetica", "normal");
  doc.text(`${order.firstName} ${order.lastName}`, 14, 69);
  doc.text(order.address, 14, 76);
  doc.text(order.city, 14, 82);
  doc.text(order.phone, 14, 88);

  const tableColumn = ["No.", "Nama Produk", "Kategori", "Qty", "Harga", "Total"];
  const tableRows = [];

  order.itemsDetail.forEach((item, index) => {
    const itemData = [
      index + 1,
      item.name,
      item.category,
      item.quantity,
      formatToIDR(item.price),
      formatToIDR(item.price * item.quantity),
    ];
    tableRows.push(itemData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 96,
    theme: 'striped',
    headStyles: { fillColor: [38, 70, 83] },
  });

  const finalY = doc.lastAutoTable.finalY || 100;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 140, finalY + 10);
  doc.text(formatToIDR(order.total), 196, finalY + 10, { align: "right" });
  doc.text("Ongkir:", 140, finalY + 17);
  doc.text("Gratis", 196, finalY + 17, { align: "right" });
  doc.setLineWidth(0.2);
  doc.line(140, finalY + 22, 196, finalY + 22);
  doc.setFontSize(14);
  doc.text("TOTAL", 140, finalY + 28);
  doc.text(formatToIDR(order.total), 196, finalY + 28, { align: "right" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Terima kasih telah membeli mebel di Toko Mebel Amanah. Pembayaran lunas.",
    14,
    finalY + 45
  );

  doc.save(`invoice-${order._id}.pdf`);
};