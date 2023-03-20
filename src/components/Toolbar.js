import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

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
import { selectCurrentEditorTool, setEditorTool } from "../feature/editorSlice";

export default function Toolbar() {
  const dispatch = useDispatch();
  const editorTool = useSelector(selectCurrentEditorTool);

  const changeEditorTool = (input) => {
    dispatch(setEditorTool(input));
  };

  return (
    <EditorTool>
      <EditorToolField>
        <Icon
          onClick={() => changeEditorTool("pencil")}
          src={pen2Icon}
          alt="penIcon"
        />
        <Icon
          onClick={() => changeEditorTool("eraser")}
          src={eraser1Icon}
          alt="eraserIcon"
        />
        <Icon
          onClick={() => changeEditorTool("highLightPen")}
          src={marker1Icon}
          alt="markerIcon"
        />
        <Icon
          onClick={() => changeEditorTool("postIt")}
          src={post1Icon}
          alt="postItIcon"
        />
      </EditorToolField>
      {editorTool === "pencil" && <PenStatusTool />}
      {editorTool === "eraser" && <EraserStatusTool />}
      {editorTool === "highLightPen" && <HightLightStatusTool />}
      {editorTool === "postIt" && <PostItStatusTool />}
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
