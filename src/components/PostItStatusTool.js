import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";

import { boldIcon } from "../assets/editorIcon";
import {
  setSelectedFontUrl,
  setPostItFontSize,
  selectIsBold,
  selectPostItFontSize,
  selectCurrentPage,
  selectCurrentPostIt,
} from "../feature/editorSlice";

export default function PostItStatusTool({ isBoldSelected }) {
  const dispatch = useDispatch();
  const fontSize = useSelector(selectPostItFontSize);
  const { showBoundary } = useErrorBoundary();
  const isBold = useSelector(selectIsBold);
  const currentPage = useSelector(selectCurrentPage);
  const currentPostIt = useSelector(selectCurrentPostIt);
  const fontSizeArray = Array.from({ length: 21 }, (v, i) => i + 10);

  const handleClickBold = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = selection.anchorNode;
    const firstDivParentNode = startNode.parentNode.closest("div");

    if (!isBoldSelected()) {
      const rangeChildNodes = [...range.cloneContents().childNodes];
      const spanList = rangeChildNodes.filter(
        (childNode) => childNode.nodeName === "SPAN",
      );

      if (spanList.length > 0) {
        const textNode = document.createTextNode(selection.toString());
        range.deleteContents();
        range.insertNode(textNode);

        firstDivParentNode.querySelectorAll("span").forEach((span) => {
          if (span.outerText.length === 0) {
            firstDivParentNode.removeChild(span);
          }
        });
      }

      const newSpan = document.createElement("span");
      newSpan.style.fontWeight = "bold";

      range.surroundContents(newSpan);
    } else {
      const firstSpanParentNode = startNode.parentNode.closest("span");
      const textNode = document.createTextNode(selection.toString());
      firstDivParentNode.replaceChild(textNode, firstSpanParentNode);
    }

    selection.removeAllRanges();
  };

  const handleChangeFont = async (event) => {
    try {
      const selectedFont = event.target.value;
      const response = await axios.get(
        `${process.env.REACT_APP_NOTED_API_SERVER}/fonts/${selectedFont}`,
        {
          withCredentials: true,
          responseType: "arraybuffer",
        },
      );
      const fontBuffer = response.data;
      const fontBlob = new Blob([fontBuffer], {
        type: "font/woff2",
      });
      const fontUrl = URL.createObjectURL(fontBlob);

      dispatch(
        setSelectedFontUrl({
          currentPage,
          currentPostIt,
          fontUrl,
          selectedFont,
        }),
      );
    } catch (error) {
      showBoundary(error);
    }
  };

  const handleChangeSize = (event) => {
    const changedSize = event.target.value;
    dispatch(setPostItFontSize({ currentPage, changedSize, currentPostIt }));
  };

  return (
    <ToolStatusField>
      <FormatIcon>
        <Icon
          src={boldIcon}
          alt="Bold Button Icon"
          isBold={isBold}
          onClick={handleClickBold}
        />
      </FormatIcon>
      <select onChange={handleChangeFont}>
        <option>Fasthand</option>
        <option>MavenPro</option>
        <option>PlayfairDisplay</option>
        <option>Roboto</option>
        <option>Rubik</option>
        <option>RubikIso</option>
        <option>Jamsil</option>
        <option>KCCChassam</option>
      </select>
      <select onChange={handleChangeSize} defaultValue={fontSize}>
        {fontSizeArray.map((size) => {
          return <option key={size}>{size}px</option>;
        })}
      </select>
    </ToolStatusField>
  );
}

const ToolStatusField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 50%;
  border: 1px solid black;
`;

const FormatIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  padding: 6px;
  border-radius: 10%;
  border: 1px solid gray;
  background-color: ${({ isBold }) => (isBold ? "#ffc0cb" : "transparent")};

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;
