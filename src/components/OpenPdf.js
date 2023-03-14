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
            <FileTitle>asdgkjsdhflkgjshldkjfhglskdjfh</FileTitle>
          </FileList>
          <FileDate>2023.03.14</FileDate>
        </FileGroup>
      </DbFileWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  height: 100vh;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const LocalFileWrapper = styled.div`
  width: 700px;
  height: 230px;
  border: 1px solid black;
  background-color: #f9f5f2;
  padding: 20px;
  justify-content: space-between;
`;

const DbFileWrapper = styled.div`
  width: 700px;
  height: 230px;
  border: 1px solid black;
  background-color: skyblue;
  /* display: flex;
  justify-content: space-around; */

  padding: 20px;
`;

const Title = styled.div``;

const TitleGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FileGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FileList = styled.div`
  width: 100%;
  margin: 0 50px 0 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: green;
`;

const FileIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const FileTitle = styled.div``;

const FileDate = styled.div`
  margin: 0 50px 0 50px;
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
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
