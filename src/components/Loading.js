import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Document from "./Document";
import LoadingImg from "../assets/LoadingImg.svg";

export default function Loading() {
  return (
    <Wrapper>
      <LoadingImage src={LoadingImg} alt="userProfile" />
      Loading...
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: skyblue;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const LoadingImage = styled.img`
  width: 6700px;
  height: 420px;
`;
