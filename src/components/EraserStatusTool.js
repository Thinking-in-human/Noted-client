import React from "react";
import styled from "styled-components";

export default function EraserStatusTool() {
  return (
    <ToolStatusField>
      <WidthIcon>
        <SmallIcon />
        <MiddleIcon />
        <LargeIcon />
      </WidthIcon>
      <input type="range" min="5" max="40" step="5" value="5" />
    </ToolStatusField>
  );
}

const WidthIcon = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SmallIcon = styled.div`
  width: 10px;
  height: 10px;
  border: 1px solid rgb(98, 205, 255);
  border-radius: 50%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const MiddleIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgb(98, 205, 255);
  border-radius: 50%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const LargeIcon = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid rgb(98, 205, 255);
  border-radius: 50%;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const ToolStatusField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border: 1px solid black;
`;
