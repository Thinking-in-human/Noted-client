import React from "react";
import styled from "styled-components";

import documentIcon from "../assets/documentIcon.svg";

export default function OpenPdf() {
  return (
    <Wrapper>
      <LocalFileWrapper>
        <Title>START WITH NEW DOCUMENT</Title>
        <File>+</File>
      </LocalFileWrapper>
      <DbFileWrapper>
        <TitleGroup>
          <Title>MY DOCUMENT</Title>
          <Title>LAST MODIFIED DATE</Title>
        </TitleGroup>
        <FileGroup>
          <FileList>
            <FileIcon src={documentIcon} alt="userProfile" />
            <FileTitle>Testing</FileTitle>
          </FileList>
          <FileDate>2023.03.14</FileDate>
        </FileGroup>
        <FileGroup>
          <FileList>
            <FileIcon src={documentIcon} alt="userProfile" />
            <FileTitle>Example File Name</FileTitle>
          </FileList>
          <FileDate>2023.03.14</FileDate>
        </FileGroup>
      </DbFileWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: auto;
  font-size: 15px;
`;

const LocalFileWrapper = styled.div`
  justify-content: space-between;
  width: 700px;
  height: 230px;
  padding: 20px;
  border: 1px solid black;
  border-bottom-style: none;
  background-color: #f9f5f2;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin: 5px;
`;

const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116px;
  height: 168px;
  margin: 20px;
  border: 1px dotted black;
  background-color: white;
`;

const DbFileWrapper = styled.div`
  width: 700px;
  height: 230px;
  padding: 20px;
  border: 1px solid black;
`;

const TitleGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FileGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FileList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 50px 0 50px;
`;

const FileIcon = styled.img`
  width: 35px;
  height: 35px;
  margin: 5px;
`;

const FileTitle = styled.div`
  font-size: 15px;
`;

const FileDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 50px 0 50px;
  font-size: 15px;
  text-align: center;
`;
