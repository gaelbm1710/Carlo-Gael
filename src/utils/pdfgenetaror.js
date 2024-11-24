import jsPDF from "jspdf";

const PdfGenerator = (kpis, charts, mapImage) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Reporte", 10, 10);
  doc.setFontSize(12);
  doc.text(`Proyectos: ${kpis.projects}`, 10, 20);
  doc.text(`Unidades Totales: ${kpis.unitsTot}`, 10, 30);
  doc.text(`Unidades Disponibles: ${kpis.unitsAvailable}`, 10, 40);
  doc.text(`Precio Promedio: $${kpis.avgPrice}`, 10, 50);
  if (charts.inventoryChart) {
    doc.text("Inventario", 10, 60);
    doc.addImage(charts.inventoryChart, "JPEG", 10, 70, 180, 100);
  }
  if (charts.populationChart) {
    doc.text("Population", 10, 180);
    doc.addImage(charts.populationChart, "JPEG", 10, 190, 180, 100);
  }
  doc.addPage();
  if (charts.projectsChart) {
    doc.text("Proyectos", 10, 10);
    doc.addImage(charts.projectsChart, "JPEG", 10, 20, 180, 100);
  }
  if (mapImage) {
    doc.text("Mapa", 10, 130);
    doc.addImage(mapImage, "JPEG", 10, 140, 180, 100);
  }
  doc.save("reporte.pdf");
};

export default PdfGenerator;
