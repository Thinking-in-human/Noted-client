import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as pdfjs from "pdfjs-dist";
import { useErrorBoundary } from "react-error-boundary";

import PostIt from "./PostIt";
import {
  selectPostIts,
  selectCurrentPage,
  changePageNumber,
  selectDrawingData,
} from "../feature/editorSlice";
import { useDrawOnMouseMove, drawByStatus } from "../utils/drawingCanvas";
import CONSTANT from "../constants/constant";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function Document({ pdfDocument, textBoxRef, onMouseUp }) {
  const currentPage = useSelector(selectCurrentPage);
  const drawingData = useSelector(selectDrawingData)[currentPage];
  const { showBoundary } = useErrorBoundary();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);

  const postIts = useSelector(selectPostIts);
  const postItsArray = Object.keys(postIts);

  useEffect(() => {
    const renderPdf = async () => {
      try {
        const page = await pdfDocument.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1 });

        const pdfCanvas = pdfRef.current;
        const canvasContext = pdfCanvas.getContext("2d");
        pdfCanvas.width = CONSTANT.CANVAS_WIDTH;
        pdfCanvas.height = CONSTANT.CANVAS_HEIGHT;

        drawByStatus(canvasRef.current, drawingData);

        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
      } catch (error) {
        showBoundary(error);
      }
    };

    renderPdf();
  }, [currentPage]);

  const handleNextPage = () => {
    dispatch(changePageNumber("next"));
  };

  const handlePrevPage = () => {
    dispatch(changePageNumber("prev"));
  };

  useDrawOnMouseMove(canvasRef);
  drawByStatus(canvasRef.current, drawingData);

  return (
    <Background>
      {postItsArray.map((postItId) => {
        return (
          <PostIt
            key={postItId}
            postItId={postItId}
            onMouseUp={onMouseUp}
            contentEditable
            textBoxRef={textBoxRef}
          />
        );
      })}
      <CanvasPage ref={canvasRef} />
      <PdfPage ref={pdfRef} />
      <ButtonWrapper>
        <PageButton onClick={handlePrevPage} type="button">
          &lt;
        </PageButton>
      </ButtonWrapper>
      <PdfWrapper>
        <CanvasPage ref={canvasRef} />
        <PdfPage ref={pdfRef} />
      </PdfWrapper>
      <ButtonWrapper>
        <PageButton onClick={handleNextPage} type="button">
          &gt;
        </PageButton>
      </ButtonWrapper>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100vw;
  height: 100vh;
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
  width: ${CONSTANT.CANVAS_WIDTH};
  height: ${CONSTANT.CANVAS_HEIGHT};
  z-index: 2;
`;

const PdfPage = styled.canvas`
  position: absolute;
  border: 1px solid gray;
  width: ${CONSTANT.CANVAS_WIDTH};
  height: ${CONSTANT.CANVAS_HEIGHT};
`;

const PageButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 40px;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: white;

  &:hover {
    background-color: #ffc0cb;
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
