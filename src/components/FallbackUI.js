import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

export default function FallbackUI({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  const errorInfo = {
    status: 500,
    message: "Internal Error",
  };

  if (error.response?.status === 401) {
    errorInfo.status = 401;
    errorInfo.message = "Please Login";
  }

  if (error.response?.status === 404) {
    errorInfo.status = 404;
    errorInfo.message = "Not Found";
  }

  const guideUser = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <ErrorCode>{errorInfo.status}</ErrorCode>
        <ErrorMessage onClick={guideUser}>{errorInfo.message}</ErrorMessage>
      </Wrapper>
    </>
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
`;

const ErrorCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 80px;
  padding: 10px;
  margin: 10px;
  font-size: 100px;
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
  font-size: 60px;

  &:hover,
  &:focus,
  &:active {
    border: 2px solid blueviolet;
  }
`;
