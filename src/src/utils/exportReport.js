import jsPDF from "jspdf"

export function exportADRReport(report){

const doc = new jsPDF()

doc.text("ADR REPORT", 10, 10)

doc.text("Patient Age: " + report.patient_age, 10, 20)

doc.text("Suspected Drug: " + report.suspected_drug, 10, 30)

doc.text("Reaction: " + report.reaction, 10, 40)

doc.text("Severity: " + report.severity, 10, 50)

doc.text("Causality: " + report.causality, 10, 60)

doc.save("ADR_Report.pdf")

}