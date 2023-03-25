import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { drawByStatus } from "./drawingCanvas";

const saveCurrentPdf = async (userId, documentId, allDrawingData, CONSTANT) => {
  const { CANVAS_WIDTH, CANVAS_HEIGHT, API } = CONSTANT;

  const response = await axios(
    `${API}/users/${userId}/documents/${documentId}`,
    {
      method: "GET",
      withCredentials: true,
      responseType: "arraybuffer",
    },
  );

  const selectDocuments = new Uint8Array(response.data);

  const loadPdf = await PDFDocument.load(selectDocuments);
  const page = loadPdf.getPages([CANVAS_WIDTH, CANVAS_HEIGHT]);
  const allDrawingDataArray = Object.values(allDrawingData);

  allDrawingDataArray.forEach(async (dataPerPage, index) => {
    const canvas = document.createElement("canvas");
    drawByStatus(canvas, dataPerPage);

    const imageData = canvas.toDataURL("image/png");
    const imageDataBytes = await fetch(imageData).then((res) =>
      res.arrayBuffer(),
    );

    const pdfImage = await loadPdf.embedPng(imageDataBytes);

    page[index].drawImage(pdfImage, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    const pdfBytes = await loadPdf.save();

    if (index === allDrawingDataArray.length - 1) {
      saveAs(new Blob([pdfBytes]), "combined.pdf");
    }
  });
};

export default saveCurrentPdf;
