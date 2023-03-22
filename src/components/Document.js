import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  selectGlobalColor,
  selectGlobalWidth,
  selectGlobalOpacity,
} from "../feature/editorSlice";

export default function Document() {
  const globalColor = useSelector(selectGlobalColor);
  const globalWidth = useSelector(selectGlobalWidth);
  const globalOpacity = useSelector(selectGlobalOpacity);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);
  const [drawQueue, setDrawQueue] = useState([]);

  const pushDrawQueue = (input) => {
    setDrawQueue((prev) => [...prev, input]);
  };

  const popDrawQueue = () => {
    setDrawQueue((prev) => prev.slice(0, prev.length - 1));
  };

  useEffect(() => {
    const renderPdf = async () => {
      const pdfJS = await import("pdfjs-dist/build/pdf");
      pdfJS.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      const pdf = await pdfJS.getDocument("example.pdf").promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = canvasRef.current;
      canvas.width = 700;
      canvas.height = 900;

      const pdfCanvas = pdfRef.current;
      const canvasContext = pdfCanvas.getContext("2d");
      pdfCanvas.width = 700;
      pdfCanvas.height = 900;

      const renderContext = { canvasContext, viewport };
      page.render(renderContext);
    };

    renderPdf();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const linePoints = [];

    const handleMouseMove = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
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
      pushDrawQueue(linePoints);
      console.log(linePoints, "라인 포인트");

      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;

      linePoints.length = 0;
      linePoints.push({
        xPoint: x,
        yPoint: y,
        color: globalColor,
        width: globalWidth,
        opacity: globalOpacity,
      });

      context.beginPath();
      context.moveTo(x, y);

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [drawQueue, globalWidth, globalOpacity, globalColor]);

  const drawUndoPath = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, 700, 900);

    drawQueue.forEach((drawing, index) => {
      if (index < drawQueue.length - 1) {
        context.beginPath();
        context.moveTo(drawing[0]?.xPoint, drawing[0]?.yPoint);
        for (let i = 1; i < drawing.length; i += 1) {
          context.strokeStyle = drawing[i].color;
          context.lineWidth = drawing[i].width;
          context.globalAlpha = drawing[i].opacity;
          context.lineTo(drawing[i].xPoint, drawing[i].yPoint);
          context.stroke();
        }
      }
    });

    popDrawQueue();
  };

  return (
    <>
      <button type="button" onClick={drawUndoPath}>
        undo
      </button>
      <Background>
        <CanvasPage ref={canvasRef} />
        <PdfPage ref={pdfRef} />
      </Background>
    </>
  );
}

const Background = styled.div`
  background-color: yellow;
  border: 10px solid red;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const CanvasPage = styled.canvas`
  position: absolute;
  width: 700px;
  height: 900px;
  z-index: 1;
`;

const PdfPage = styled.canvas`
  border: 10px solid blue;
  position: absolute;
  width: 700px;
  height: 900px;
`;
