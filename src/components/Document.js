import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectPencilColor, selectPencilWidth } from "../feature/editorSlice";

export default function Document() {
  const pencilColor = useSelector(selectPencilColor);
  const pencilWidth = useSelector(selectPencilWidth);

  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPdf = async () => {
      const pdfJS = await import("pdfjs-dist/build/pdf");
      pdfJS.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      const pdf = await pdfJS.getDocument("example.pdf").promise;

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      canvas.height = 900;
      canvas.width = 700;

      const renderContext = { canvasContext, viewport };
      page.render(renderContext);
    };

    renderPdf();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.globalAlpha = 0.03;

    function handleMouseMove(e) {
      const x = e.offsetX;
      const y = e.offsetY;

      context.lineTo(x, y);
      context.stroke();
    }

    function handleMouseUp() {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    }

    function handleMouseDown(event) {
      context.strokeStyle = pencilColor;
      context.lineWidth = pencilWidth;
      context.beginPath();

      const x = event.offsetX;
      const y = event.offsetY;

      context.moveTo(x, y);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    }

    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [pencilColor, pencilWidth]);

  return (
    <Background>
      <DocumentPage ref={canvasRef} />
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DocumentPage = styled.canvas`
  width: 700px;
  height: 900px;
  /* padding: 2cm;
  margin: 4rem;
  border: 1px #d3d3d3 solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
  background-color: white;
`;
