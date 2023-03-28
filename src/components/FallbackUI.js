import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function FallbackUI({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  const errorInfo = {
    title: "잠시 후 다시 시도해주세요",
    message: "요청을 처리하는데 실패 했습니다.",
  };

  if (error.response.status === 401) {
    errorInfo.title = "접근 권한이 없습니다";
    errorInfo.message = "로그인을 해주세요";
  }

  if (error.response.status === 404) {
    errorInfo.title = "요청 사항을 확인 할 수 없습니다";
    errorInfo.message = "요청 사항을 확인 후 다시 시도해 주시기 바랍니다.";
  }

  const guideUser = () => {
    if (error.response.status === 401) {
      navigate("/");
      resetErrorBoundary();
    } else {
      resetErrorBoundary();
    }
  };

  return (
    <Wrapper>
      <ErrorCode>{errorInfo.title}</ErrorCode>
      <ErrorMessage onClick={guideUser}>{errorInfo.message}</ErrorMessage>
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
  font-size: 60px;
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

  &:hover,
  &:focus,
  &:active {
    border: 2px solid blueviolet;
  }
`;
