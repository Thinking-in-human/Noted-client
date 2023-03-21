import React, { useState, useRef } from "react";
import styled from "styled-components";

import PenStatusTool from "./PenStatusTool";
import EraserStatusTool from "./EraserStatusTool";
import HightLightStatusTool from "./HightLightStatusTool";
import PostItStatusTool from "./PostItStatusTool";
import {
  pen1Icon,
  pen2Icon,
  eraser1Icon,
  eraser2Icon,
  marker1Icon,
  marker2Icon,
  post1Icon,
  post2Icon,
} from "../assets/editorIcon";

export default function Toolbar() {
  const [mode, setMode] = useState("postIt");
  let editorTool = null;

  if (mode === "pen") {
    editorTool = <PenStatusTool />;
  } else if (mode === "eraser") {
    editorTool = <EraserStatusTool />;
  } else if (mode === "hightLight") {
    editorTool = <HightLightStatusTool />;
  } else if (mode === "postIt") {
    editorTool = <PostItStatusTool />;
  }

  return (
    <EditorTool>
      <EditorToolField>
        <Icon src={pen2Icon} alt="penIcon" />
        <Icon src={eraser1Icon} alt="eraserIcon" />
        <Icon src={marker1Icon} alt="markerIcon" />
        <Icon src={post1Icon} alt="postItIcon" />
      </EditorToolField>
      {editorTool}
    </EditorTool>
  );
}

const EditorTool = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  /* border: 1px solid black; */
`;

const EditorToolField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: 1px solid black;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  padding: 1px;
  border-radius: 10%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;
