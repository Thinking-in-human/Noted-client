import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as pdfjs from "pdfjs-dist";
import {
  selectCurrentPage,
  changePageNumber,
  selectDrawingData,
} from "../feature/editorSlice";
import { useDrawOnMouseMove, drawByStatus } from "../utils/drawingCanvas";
import CONSTANT from "../constants/constant";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function Document({ pdfDocument }) {
  const currentPage = useSelector(selectCurrentPage);
  const drawingData = useSelector(selectDrawingData)[currentPage];
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);
  const combinedRef = useRef(null);

  useEffect(() => {
    const renderPdf = async () => {
      const page = await pdfDocument.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1 });

      const pdfCanvas = pdfRef.current;
      const canvasContext = pdfCanvas.getContext("2d");
      pdfCanvas.width = CONSTANT.CANVAS_WIDTH;
      pdfCanvas.height = CONSTANT.CANVAS_HEIGHT;

      drawByStatus(canvasRef.current, drawingData);

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

  useDrawOnMouseMove(canvasRef);
  drawByStatus(canvasRef.current, drawingData);

  return (
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
  width: ${CONSTANT.CANVAS_WIDTH};
  height: ${CONSTANT.CANVAS_HEIGHT};
  z-index: 2;
`;

const PdfPage = styled.canvas`
  position: absolute;
  border: 5px solid brown;
  width: ${CONSTANT.CANVAS_WIDTH};
  height: ${CONSTANT.CANVAS_HEIGHT};
`;

const CombinedCanvas = styled.canvas`
  position: absolute;
  width: ${CONSTANT.CANVAS_WIDTH};
  height: ${CONSTANT.CANVAS_HEIGHT};
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
