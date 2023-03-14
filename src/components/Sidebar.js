import React from "react";
import styled from "styled-components";

export default function Sidebar() {
  return (
    <Wrapper>
      <PageGroup>
        <PageNumber>1</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
      <PageGroup>
        <PageNumber>2</PageNumber>
        <File>+</File>
      </PageGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
  /* height: 100vh; */
  background-color: red;
`;

const File = styled.div`
  width: 116px;
  height: 168px;
  border: 1px dotted black;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageNumber = styled.div``;

const PageGroup = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
`;
