import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";

import PenStatusTool from "./PenStatusTool";
import EraserStatusTool from "./EraserStatusTool";
import HightLightStatusTool from "./HightLightStatusTool";
import PostItStatusTool from "./PostItStatusTool";
import {
  pen1Icon,
  pen2Icon,
  eraser1Icon,
  eraser2Icon,
  highLight1Icon,
  highLight2Icon,
  post1Icon,
  post2Icon,
  undoIcon,
  redoIcon,
} from "../assets/editorIcon";
import {
  selectCurrentEditorTool,
  changeGlobalToolOption,
  moveDataUndoArray,
  moveDataRedoArray,
  setPostIts,
} from "../feature/editorSlice";

export default function Toolbar({ textBoxRef, isBoldSelected }) {
  const dispatch = useDispatch();
  const editorTool = useSelector(selectCurrentEditorTool);

  const changeEditorTool = (tool) => {
    dispatch(changeGlobalToolOption(tool));
  };

  const showPrevDrawing = () => {
    dispatch(moveDataUndoArray());
  };

  const showNextDrawing = () => {
    dispatch(moveDataRedoArray());
  };

  const makeNewPostItStatus = () => {
    const postItObject = {
      [uuid()]: {
        width: "300px",
        height: "300px",
        color: "yellow",
        contents: "",
        bold: false,
        italic: false,
        font: "SerifText-Regular.woff2",
        fontColor: "black",
      },
    };

    dispatch(setPostIts(postItObject));
  };

  return (
    <EditorTool>
      <EditorToolField>
        <Icon
          onClick={showPrevDrawing}
          src={undoIcon}
          alt="Toggle to Show PrevDrawing"
        />
        <Icon
          onClick={showNextDrawing}
          src={redoIcon}
          alt="Toggle to Show NextDrawing"
        />
        <Icon
          onClick={() => changeEditorTool("pencil")}
          src={editorTool === "pencil" ? pen2Icon : pen1Icon}
          alt="Pen Icon"
        />
        <Icon
          onClick={() => changeEditorTool("highLightPen")}
          src={editorTool === "highLightPen" ? highLight2Icon : highLight1Icon}
          alt="Marker Icon"
        />
        <Icon
          onClick={() => {
            changeEditorTool("postIt");
            makeNewPostItStatus();
          }}
          src={editorTool === "postIt" ? post2Icon : post1Icon}
          alt="PostIt Icon"
        />
      </EditorToolField>
      {editorTool === "pencil" && <PenStatusTool />}
      {editorTool === "highLightPen" && <HightLightStatusTool />}
      {editorTool === "postIt" && (
        <PostItStatusTool
          textBoxRef={textBoxRef}
          isBoldSelected={isBoldSelected}
        />
      )}
    </EditorTool>
  );
}

const EditorTool = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
`;

const EditorToolField = styled.div`
  display: flex;
  gap: 10px;
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
