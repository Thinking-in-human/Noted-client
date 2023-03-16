import React, { useState } from "react";
import styled from "styled-components";
import pen2Icon from "../assets/icon/pen2.png";
import eraser1Icon from "../assets/icon/eraser1.png";
import marker1Icon from "../assets/icon/marker1.png";
import post1Icon from "../assets/icon/post1.png";
import pen1Icon from "../assets/icon/pen1.png";
import eraser2Icon from "../assets/icon/eraser2.png";
import marker2Icon from "../assets/icon/marker2.png";
import post2Icon from "../assets/icon/post2.png";
import PenStatusTool from "./PenStatusTool";
import EraserStatusTool from "./EraserStatusTool";
import HightLightStatusTool from "./HightLightStatusTool";
import PostIt from "./PostIt";

export default function Toolbar() {
  const [mode, setMode] = useState("postit");
  let editorTool = null;

  if (mode === "pen") {
    editorTool = <PenStatusTool />;
  } else if (mode === "eraser") {
    editorTool = <EraserStatusTool />;
  } else if (mode === "hightlight") {
    editorTool = <HightLightStatusTool />;
  } else if (mode === "postit") {
    editorTool = <PostIt />;
  }

  return (
    <EditorTool>
      <EditorToolField>
        <Icon type="image" src={pen2Icon} alt="penIcon" />
        <Icon type="image" src={eraser1Icon} alt="eraserIcon" />
        <Icon type="image" src={marker1Icon} alt="markerIcon" />
        <Icon type="image" src={post1Icon} alt="posetItIcon" />
      </EditorToolField>
      {editorTool}
    </EditorTool>
  );
}

const EditorTool = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  border: 1px solid black;
`;

const EditorToolField = styled.div`
  display: flex;
  width: 50%;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.input`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  border-radius: 10%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;
