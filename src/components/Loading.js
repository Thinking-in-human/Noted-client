import React from "react";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

const LoadingImage = styled.img``;
