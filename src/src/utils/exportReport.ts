import jsPDF from "jspdf";

export function exportReport(report: any) {

  const doc = new jsPDF();

  doc.text(JSON.stringify(report, null, 2), 10, 10);

  doc.save("ADR_Report.pdf");

}