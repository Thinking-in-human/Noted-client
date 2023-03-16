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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  padding: 10px;
  margin: auto;
  font-size: 80px;
`;

const ErrorCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 80px;
  padding: 10px;
  margin: 10px;
  border-bottom: 5px double black;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 350px;
  margin: 30px;
  border: 1px solid black;
  background-color: #f9f5f2;
`;
