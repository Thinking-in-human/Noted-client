import React from "react";
import styled from "styled-components";

export default function Error() {
  return (
    <Wrapper>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Not Found</ErrorMessage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  padding: 10px;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ErrorCode = styled.div`
  width: 700px;
  height: 80px;
  border-bottom: 5px double black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;
const ErrorMessage = styled.div`
  margin: 30px;
  width: 700px;
  height: 350px;
  border: 1px solid black;
  background-color: #f9f5f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
