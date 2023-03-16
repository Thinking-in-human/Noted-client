import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

export default function PostIt() {
  const fontSizeArr = [];

  for (let i = 1; i <= 100; i += 1) {
    fontSizeArr.push(i);
  }

  return (
    <ToolStatusField>
      <select>
        <option>Arial</option>
        <option>Verdana</option>
        <option>Times New Roman</option>
        <option>Garamond</option>
        <option>Georgia</option>
        <option>Courier New</option>
        <option>cursive</option>
      </select>
      <select>
        {fontSizeArr.map((size) => {
          return <option>{size}</option>;
        })}
      </select>
      <Icon>
        <FontAwesomeIcon icon={faBold} className="bold" />
      </Icon>
      <Icon>
        <FontAwesomeIcon icon={faItalic} className="italic" />
      </Icon>
      <Icon>
        <FontAwesomeIcon icon={faUnderline} className="underline" />
      </Icon>
      <Color>
        <input type="color" value="#000000" />
        <input type="color" value="#ff0000" />
        <input type="color" value="#0000FF" />
        <input type="color" value="#808080" />
      </Color>
    </ToolStatusField>
  );
}

const ToolStatusField = styled.div`
  display: flex;
  width: 50%;
  border: 1px solid black;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.span`
  width: 25px;
  height: 25px;
  text-align: center;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const Color = styled.div`
  input[type="color"] {
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
  }
`;
