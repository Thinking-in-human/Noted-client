import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { selectUserId } from "../feature/userSlice";
import PDFViewer from "./PDFViewer";
import Toolbar from "./Toolbar";
import { setBold } from "../feature/editorSlice";

export default function Editor() {
  const loginUserId = useSelector(selectUserId);
  const { documentId } = useParams();
  const dispatch = useDispatch();

  const isBoldSelected = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = selection.anchorNode;
    const firstSpanParentNode = startNode.parentNode.closest("span");

    if (!firstSpanParentNode) {
      return false;
    }

    if (firstSpanParentNode.outerText === range.toString()) {
      return true;
    }

    const textList = [...range.cloneContents().childNodes].filter(
      (childNode) => childNode.nodeName === "#text",
    );

    if (textList.every((textNode) => textNode.data.toString() === "")) {
      return true;
    }

    return false;
  };
  const handleMouseUp = () => {
    dispatch(setBold(isBoldSelected()));
  };

  return (
    <Wrapper>
      <Toolbar isBoldSelected={isBoldSelected} />
      {loginUserId && documentId && (
        <PDFViewer
          url={`${process.env.REACT_APP_NOTED_API_SERVER}/users/${loginUserId}/documents/${documentId}`}
          onMouseUp={handleMouseUp}
          documentId={documentId}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;
