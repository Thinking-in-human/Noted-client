import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as pdfjs from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import axios from "axios";

import {
  selectGlobalColor,
  selectGlobalWidth,
  selectGlobalOpacity,
  pushDrawingDataCurrentPage,
  selectCurrentPage,
  changePageNumber,
  selectDrawingData,
} from "../feature/editorSlice";

const CANVAS_WIDTH = 594.95996;
const CANVAS_HEIGHT = 841.91998;

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function Document({ url, pdfDocument }) {
  const globalColor = useSelector(selectGlobalColor);
  const globalWidth = useSelector(selectGlobalWidth);
  const globalOpacity = useSelector(selectGlobalOpacity);
  const currentPage = useSelector(selectCurrentPage);
  const drawingData = useSelector(selectDrawingData)[currentPage];
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);
  const combinedRef = useRef(null);
  console.log(drawingData, "data");

  useEffect(() => {
    const renderPdf = async () => {
      const page = await pdfDocument.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = canvasRef.current;
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      const pdfCanvas = pdfRef.current;
      const canvasContext = pdfCanvas.getContext("2d");
      pdfCanvas.width = CANVAS_WIDTH;
      pdfCanvas.height = CANVAS_HEIGHT;

      if (canvasRef.current) {
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawingData.forEach((drawing) => {
          context.beginPath();
          context.moveTo(drawing[0]?.xPoint, drawing[0]?.yPoint);
          for (let i = 1; i < drawing.length; i += 1) {
            context.strokeStyle = drawing[i]?.color;
            context.lineWidth = drawing[i]?.width;
            context.globalAlpha = drawing[i]?.opacity;
            context.lineTo(drawing[i]?.xPoint, drawing[i]?.yPoint);
            context.stroke();
          }
        });
      }

      const renderContext = { canvasContext, viewport };
      page.render(renderContext);
    };

    renderPdf();
  }, [currentPage]);

  const setNextPage = () => {
    dispatch(changePageNumber("next"));
  };

  const setPrevPage = () => {
    dispatch(changePageNumber("prev"));
  };

  const savePdf = async () => {
    const response = await axios(url, {
      method: "GET",
      withCredentials: true,
      responseType: "arraybuffer",
    });

    const selectDocuments = new Uint8Array(response.data);

    const loadPdf = await PDFDocument.load(selectDocuments);
    const page = loadPdf.getPages([CANVAS_WIDTH, CANVAS_HEIGHT]);

    const combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = CANVAS_WIDTH;
    combinedCanvas.height = CANVAS_HEIGHT;

    const combinedContext = combinedCanvas.getContext("2d");
    combinedContext.drawImage(canvasRef.current, 0, 0);

    const imageData = combinedCanvas.toDataURL("image/png");
    const imageDataBytes = await fetch(imageData).then((res) =>
      res.arrayBuffer(),
    );

    const pdfImage = await loadPdf.embedPng(imageDataBytes);

    page[0].drawImage(pdfImage, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    const pdfBytes = await loadPdf.save();
    saveAs(new Blob([pdfBytes]), "combined.pdf");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let linePoints = [];

    const drawWhenMouseMove = (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.globalAlpha = globalOpacity;
      context.strokeStyle = globalColor;
      context.lineWidth = globalWidth;

      linePoints.push({
        xPoint: x,
        yPoint: y,
        color: globalColor,
        width: globalWidth,
        opacity: globalOpacity,
      });

      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseUp = () => {
      dispatch(pushDrawingDataCurrentPage(linePoints));

      canvas.removeEventListener("mousemove", drawWhenMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (event) => {
      const x = event.offsetX;
      const y = event.offsetY;

      linePoints = [];
      linePoints.push({
        xPoint: x,
        yPoint: y,
        color: globalColor,
        width: globalWidth,
        opacity: globalOpacity,
      });

      context.beginPath();
      context.moveTo(x, y);

      canvas.addEventListener("mousemove", drawWhenMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dispatch, globalWidth, globalOpacity, globalColor]);

  if (canvasRef.current) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawingData.forEach((drawing) => {
      context.beginPath();
      context.moveTo(drawing[0]?.xPoint, drawing[0]?.yPoint);
      for (let i = 1; i < drawing.length; i += 1) {
        context.strokeStyle = drawing[i]?.color;
        context.lineWidth = drawing[i]?.width;
        context.globalAlpha = drawing[i]?.opacity;
        context.lineTo(drawing[i]?.xPoint, drawing[i]?.yPoint);
        context.stroke();
      }
    });
  }

  return (
    <>
      <button type="button" onClick={savePdf}>
        저장
      </button>
      <Background>
        <ButtonWrapper>
          <PageButton onClick={setPrevPage} type="button">
            ⬅️
          </PageButton>
        </ButtonWrapper>
        <PdfWrapper>
          <CombinedCanvas ref={combinedRef} />
          <CanvasPage ref={canvasRef} />
          <PdfPage ref={pdfRef} />
        </PdfWrapper>
        <ButtonWrapper>
          <PageButton onClick={setNextPage} type="button">
            ➡️
          </PageButton>
        </ButtonWrapper>
      </Background>
    </>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const PdfWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 60%;
  height: 100%;
`;

const CanvasPage = styled.canvas`
  position: absolute;
  border: 5px solid brown;
  width: ${CANVAS_WIDTH};
  height: ${CANVAS_HEIGHT};
  z-index: 2;
`;

const PdfPage = styled.canvas`
  position: absolute;
  border: 5px solid brown;
  width: ${CANVAS_WIDTH};
  height: ${CANVAS_HEIGHT};
`;

const CombinedCanvas = styled.canvas`
  position: absolute;
  width: ${CANVAS_WIDTH};
  height: ${CANVAS_HEIGHT};
  z-index: 1;
`;

const PageButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 40px;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: auto;
`;
