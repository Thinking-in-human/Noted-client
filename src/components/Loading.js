import React from "react";
import styled from "styled-components";

import tableImage from "../assets/tableImage.png";

export default function Loading() {
  return (
    <Wrapper>
      <img src={tableImage} alt="Loading Page" />
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
