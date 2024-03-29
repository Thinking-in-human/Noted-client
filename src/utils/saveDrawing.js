import axios from "axios";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

import { drawByStatus } from "./drawingCanvas";

const saveCurrentPdf = async (
  userId,
  documentId,
  allDrawingData,
  CONSTANT,
  postItInfo,
) => {
  const {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    POST_IT_SIZE,
    POST_IT_CLOSE_TEXT_SIZE,
    POST_IT_CLOSE_BOX_SIZE,
    POST_IT_PADDING,
    POST_IT_BORDER,
  } = CONSTANT;

  const response = await axios(
    `${process.env.REACT_APP_NOTED_API_SERVER}/users/${userId}/documents/${documentId}`,
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
    const yellow = rgb(1, 0.941, 0);
    const black = rgb(0, 0, 0);
    const standardFont = await loadPdf.embedFont(StandardFonts.TimesRoman);
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

    const postIts = Object.values(postItInfo[index + 1]);

    postIts.forEach((postIt) => {
      const { contents, fontSize, position } = postIt;
      const postItX = position.x;
      const postItY = position.y;

      page[index].drawRectangle({
        x: postItX + POST_IT_BORDER,
        y:
          CANVAS_HEIGHT -
          postItY -
          POST_IT_SIZE -
          POST_IT_PADDING -
          POST_IT_BORDER,
        width: POST_IT_SIZE + POST_IT_PADDING * 2 + POST_IT_BORDER * 2,
        height: POST_IT_SIZE + POST_IT_PADDING * 2 + POST_IT_BORDER * 2,
        color: yellow,
        borderWidth: POST_IT_BORDER,
        opacity: 0.6,
      });

      page[index].drawRectangle({
        x: postItX + POST_IT_PADDING + POST_IT_BORDER,
        y: CANVAS_HEIGHT - postItY - POST_IT_CLOSE_BOX_SIZE,
        width: POST_IT_CLOSE_BOX_SIZE,
        height: POST_IT_CLOSE_BOX_SIZE,
        color: yellow,
        borderWidth: POST_IT_BORDER,
        opacity: 0.6,
      });

      page[index].drawText("X", {
        x: postItX + POST_IT_PADDING + POST_IT_BORDER + 5,
        y:
          CANVAS_HEIGHT - POST_IT_BORDER - postItY - POST_IT_CLOSE_BOX_SIZE + 5,
        size: POST_IT_CLOSE_TEXT_SIZE,
        lineHeight: 10,
        color: black,
        font: standardFont,
        opacity: 1,
      });

      const splitText = (wholeText) => {
        let text = "";
        const result = [];
        for (let i = 0; i < wholeText.length; i += 1) {
          text += wholeText[i];
          const textWidth = standardFont.widthOfTextAtSize(
            text,
            Number(fontSize.split("px")[0]),
          );
          if (textWidth > POST_IT_SIZE) {
            result.push(text);
            text = "";
          }
        }
        result.push(text);
        return result;
      };

      const result = splitText(contents);

      result.forEach((text, textIndex) => {
        page[index].drawText(text, {
          x: postItX + POST_IT_PADDING + POST_IT_BORDER + 5,
          y:
            CANVAS_HEIGHT -
            POST_IT_BORDER -
            POST_IT_PADDING -
            postItY -
            POST_IT_CLOSE_BOX_SIZE -
            (textIndex + 1) * Number(fontSize.split("px")[0]) +
            5,
          size: Number(fontSize.split("px")[0]),
          lineHeight: Number(fontSize.split("px")[0]),
          color: black,
          font: standardFont,
          maxWidth: POST_IT_SIZE - POST_IT_PADDING * 2,
          opacity: 1,
        });
      });
    });

    if (index === allDrawingDataArray.length - 1) {
      const pdfBytes = await loadPdf.save();
      const blobForSave = new Blob([pdfBytes], { type: "application/pdf" });
      const data = new FormData();
      data.append("file", blobForSave, "newFile");

      await axios.put(
        `${process.env.REACT_APP_NOTED_API_SERVER}/users/${userId}/documents/${documentId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      saveAs(new Blob([pdfBytes]), "newFile.pdf");
    }
  });
};

export default saveCurrentPdf;
