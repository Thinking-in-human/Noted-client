import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import PDFViewer from "./PDFViewer";
import { selectUserId } from "../feature/userSlice";
import Toolbar from "./Toolbar";
import { setSelectedDocument, setBold } from "../feature/editorSlice";
import PostIt from "./PostIt";

export default function Editor() {
  const loginUserId = useSelector(selectUserId);
  const { documentId } = useParams();
  const divRef = useRef(null);
  const dispatch = useDispatch();

  dispatch(setSelectedDocument(documentId));

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
      <Toolbar divRef={divRef} isBoldSelected={isBoldSelected} />
      <PostIt divRef={divRef} onMouseUp={handleMouseUp} />
      {loginUserId && documentId && (
        <PDFViewer
          url={`http://localhost:4000/users/${loginUserId}/documents/${documentId}`}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
`;
