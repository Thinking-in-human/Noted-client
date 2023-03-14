import React from "react";
import styled from "styled-components";

import userPic from "../assets/userPic.jpg";

export default function Error() {
  return (
    <Wrapper>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>404</ErrorMessage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  background-color: purple;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ErrorCode = styled.div`
  width: 700px;
  height: 100px;
  border-bottom: 3px double black;
  background-color: pink;
`;
const ErrorMessage = styled.div`
  width: 700px;
  height: 100px;
  border-bottom: 3px double black;
  background-color: white;
`;
