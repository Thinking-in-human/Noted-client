import axios from "axios";
import { PDFDocument, StandardFonts, opentype, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import fontkit from "@pdf-lib/fontkit";

import { drawByStatus } from "./drawingCanvas";

const saveCurrentPdf = async (
  userId,
  documentId,
  allDrawingData,
  CONSTANT,
  postItPosition,
  postItTextInfo,
) => {
  try {
    const {
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      POST_IT_SIZE,
      POST_IT_X_TEXT_SIZE,
      POST_IT_X_BOX_SIZE,
      POST_IT_PADDING,
      POST_IT_BORDER,
      API,
    } = CONSTANT;

    const { contents, isBold, fontSize, fontUrl } = postItTextInfo;

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
    const postItX = postItPosition.x;
    const postItY = postItPosition.y;

    allDrawingDataArray.forEach(async (dataPerPage, index) => {
      const yellow = rgb(1, 0.941, 0);
      const black = rgb(0, 0, 0);
      const standardFont = await loadPdf.embedFont(StandardFonts.TimesRoman);
      // const boldFont = await loadPdf.embedFont(StandardFonts.HelveticaBold);
      // const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
      // loadPdf.registerFontkit(fontkit);
      // const customFont = await loadPdf.embedFont(fontBytes);

      // const postItFont = await opentype.parse(fontBytes);
      // const boldFont = postItFont.clone().setStyle("bold");
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

      page[index].drawRectangle({
        x: postItX + POST_IT_BORDER + CANVAS_WIDTH / 2,
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
      });

      page[index].drawRectangle({
        x: postItX + POST_IT_PADDING + POST_IT_BORDER + CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - postItY - POST_IT_X_BOX_SIZE,
        width: POST_IT_X_BOX_SIZE,
        height: POST_IT_X_BOX_SIZE,
        color: yellow,
        borderWidth: POST_IT_BORDER,
      });

      page[index].drawText("X", {
        x: postItX + POST_IT_PADDING + POST_IT_BORDER + 5 + CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - POST_IT_BORDER - postItY - POST_IT_X_BOX_SIZE + 5,
        size: POST_IT_X_TEXT_SIZE,
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
          if (
            textWidth >
            POST_IT_SIZE - (POST_IT_BORDER + POST_IT_PADDING) * 2
          ) {
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
          x: postItX + POST_IT_PADDING + POST_IT_BORDER + 5 + CANVAS_WIDTH / 2,
          y:
            CANVAS_HEIGHT -
            POST_IT_BORDER -
            POST_IT_PADDING -
            postItY -
            POST_IT_X_BOX_SIZE -
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

      if (index === allDrawingDataArray.length - 1) {
        const pdfBytes = await loadPdf.save();
        const blobForSave = new Blob([pdfBytes], { type: "application/pdf" });
        const data = new FormData();
        data.append("file", blobForSave, "newFile");

        await axios.put(
          `${API}/users/${userId}/documents/${documentId}`,
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
  } catch (error) {
    throw new Error(error.message);
  }
};

export default saveCurrentPdf;
