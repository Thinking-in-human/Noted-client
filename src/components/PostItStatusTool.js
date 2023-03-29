import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { boldIcon, italicIcon, underlineIcon } from "../assets/editorIcon";
import {
  setSelectedFontUrl,
  setSelectedFontName,
  setPostItFontSize,
  selectIsBold,
} from "../feature/editorSlice";

export default function PostItStatusTool({ textBoxRef, isBoldSelected }) {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const isBold = useSelector(selectIsBold);
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
      textBoxRef.current.focus();
    } else {
      const firstSpanParentNode = startNode.parentNode.closest("span");
      const textNode = document.createTextNode(selection.toString());
      firstDivParentNode.replaceChild(textNode, firstSpanParentNode);
    }

    selection.removeAllRanges();
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeFont = async (event) => {
    const selectedFont = event.target.value;
    dispatch(setSelectedFontName(selectedFont));
    const response = await axios.get(
      `http://localhost:4000/fonts/${selectedFont}`,
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

    dispatch(setSelectedFontUrl(fontUrl));
  };

  const handleChangeSize = (event) => {
    dispatch(setPostItFontSize(event.target.value));
  };

  return (
    <ToolStatusField>
      <select onChange={handleChangeFont}>
        <option>Fasthand</option>
        <option>MavenPro</option>
        <option>PlayfairDisplay</option>
        <option>Roboto</option>
        <option>Rubik</option>
        <option>RubikIso</option>
      </select>
      <select onChange={handleChangeSize} defaultValue="10px">
        {fontSizeArray.map((size) => {
          return <option key={size}>{size}px</option>;
        })}
      </select>
      <FormatIcon>
        <Icon
          src={boldIcon}
          alt="Bold Button Icon"
          isBold={isBold}
          onClick={handleClickBold}
        />
        <Icon src={italicIcon} alt="Italic Button Icon" />
        <Icon src={underlineIcon} alt="Underline Button Icon" />
      </FormatIcon>
      <FormatColor>
        <Color
          type="color"
          defaultValue="#000000"
          onChange={handleChangeColor}
        />
        <Color
          type="color"
          defaultValue="#ff0000"
          onChange={handleChangeColor}
        />
        <Color
          type="color"
          defaultValue="#0000FF"
          onChange={handleChangeColor}
        />
        <Color
          type="color"
          defaultValue="#808080"
          onChange={handleChangeColor}
        />
      </FormatColor>
    </ToolStatusField>
  );
}

const ToolStatusField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  background-color: ${({ isBold }) => (isBold ? "#ffc0cb" : "transparent")};

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const FormatColor = styled.div`
  display: flex;
  align-items: center;
`;

const Color = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;

  &::-webkit-color-swatch {
    border-radius: 50%;
  }
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;
