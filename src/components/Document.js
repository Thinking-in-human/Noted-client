import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectPencilColor, selectPencilWidth } from "../feature/editorSlice";

export default function Document() {
  const pencilColor = useSelector(selectPencilColor);
  const pencilWidth = useSelector(selectPencilWidth);
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [drawQueue, setDrawQueue] = useState([]);

  const changePoints = (x, y) => {
    setPoints((prev) => [...prev, { xPoint: x, yPoint: y }]);
  };

  const pushDrawQueue = (newPoints) => {
    setDrawQueue((prev) => [...prev, newPoints]);
  };

  console.log(points, "points");
  console.log(drawQueue, "drawQueue");

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

  // function rememberPath(canvas, evt) {
  //   return {
  //     x: Math.round(evt.clientX - ClientRect.left),
  //     y: Math.round(evt.clientY - ClientRect.top),
  //   };
  // }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.globalAlpha = 1;
    context.strokeStyle = pencilColor;
    context.lineWidth = pencilWidth;

    const handleMouseMove = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      changePoints(x, y);

      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseUp = () => {
      pushDrawQueue(points);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      changePoints("", "");

      context.beginPath();
      changePoints(x, y);
      context.moveTo(x, y);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [pencilColor, points, pencilWidth]);

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
