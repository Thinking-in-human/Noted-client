import React from "react";
import styled from "styled-components";

import MainImg from "../assets/MainImg.svg";

export default function Login() {
  return (
    <Wrapper>
      <BackgoundColorPage />
      <MainImage src={MainImg} alt="userProfile" />
      <FirstLineTitle>Find your creativity by</FirstLineTitle>
      <SecondLineTitle>pdf editor, Noted</SecondLineTitle>
      <LoginButton>Login →</LoginButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const BackgoundColorPage = styled.div`
  width: 90%;
  height: 90%;
  margin-left: 3%;
  background-color: #f9f5f2;
`;

const FirstLineTitle = styled.div`
  position: absolute;
  top: 30%;
  left: 45%;
  font-size: 400%;
`;

const SecondLineTitle = styled.div`
  position: absolute;
  top: 41%;
  left: 60%;
  font-size: 400%;
`;

const MainImage = styled.svg`
  position: absolute;
  left: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LoginButton = styled.div`
  position: absolute;
  top: 58%;
  left: 78%;
  padding: 3px 20px;
  border: 1px solid black;
  background: none;

  cursor: pointer;
  &:active {
    color: #ffc0cb;
  }
  font-size: 200%;
`;
