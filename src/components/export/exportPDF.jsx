import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (headers, data, title = "Data Default") => {
  const doc = new jsPDF({ orientation: "landscape" });
  const tableColumn = headers.map(h => h.label);
  const tableRows = data.map(item => headers.map(h => item[h.key]));

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
  });

  doc.save(`${title}.pdf`);
};