import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectGlobalWidth,
  selectGlobalColor,
  selectGlobalOpacity,
  pushDrawingDataCurrentPage,
} from "../feature/editorSlice";
import CONSTANT from "../constants/constant";

export const drawByStatus = (canvas, drawingData) => {
  if (canvas) {
    const context = canvas.getContext("2d");
    canvas.width = CONSTANT.CANVAS_WIDTH;
    canvas.height = CONSTANT.CANVAS_HEIGHT;

    context.clearRect(0, 0, CONSTANT.CANVAS_WIDTH, CONSTANT.CANVAS_HEIGHT);

    drawingData.forEach((drawing) => {
      context.beginPath();
      context.moveTo(drawing[0]?.xPoint, drawing[0]?.yPoint);
      for (let i = 1; i < drawing.length; i += 1) {
        context.lineJoin = "round";
        context.lineCap = "round";
        context.strokeStyle = drawing[i]?.color;
        context.lineWidth = drawing[i]?.width;
        context.globalAlpha = drawing[i]?.opacity;
        context.lineTo(drawing[i]?.xPoint, drawing[i]?.yPoint);
        context.stroke();
      }
    });
  }
};

export const useDrawOnMouseMove = (ref) => {
  const globalColor = useSelector(selectGlobalColor);
  const globalWidth = useSelector(selectGlobalWidth);
  const globalOpacity = useSelector(selectGlobalOpacity);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = ref.current;
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
};
