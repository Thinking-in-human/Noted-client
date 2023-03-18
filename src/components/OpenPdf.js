import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import pdfjs from "pdfjs-dist";
import documentIcon from "../assets/document_icon.svg";
import { selectDocuments } from "../feature/userSlice";

export default function OpenPdf() {
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState("");
  // +버튼을 눌러서 PDF를 file list로 불러옴..
  const userDocuments = useSelector(selectDocuments);

  const pdfInput = useRef();
  const handleClickPdfUpload = () => {
    pdfInput.current.click();
  };

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];

    // 1. await create doc (title, file) to server
    const data = new FormData();
    data.append("file", file);
    fetch(`/documents`, {
      method: "POST",
      body: data,
    });

    // 2. routing to editor page
    // navigate(`/documents/${file.name}`);
  };

  return (
    <Wrapper>
      <LocalFileWrapper>
        <Title>START WITH NEW DOCUMENT</Title>
        <PdfInput
          type="file"
          accept=".pdf"
          ref={pdfInput}
          onChange={handleChangeFile}
        />
        <UploadButton onClick={handleClickPdfUpload}>+</UploadButton>
      </LocalFileWrapper>
      {pdfUrl && (
        <object data={pdfUrl} type="application/pdf" width="100%" height="500">
          {/* <p>
            Your web browser have a PDF plugin. Instead you can{" "}
            <a href={pdfUrl}>click here to download the PDF file.</a>
          </p> */}
        </object>
      )}
      <DbFileWrapper>
        <TitleGroup>
          <Title>MY DOCUMENT</Title>
          <Title>LAST MODIFIED DATE</Title>
        </TitleGroup>
        {userDocuments.map((document) => {
          // console.log(userDocument);
          const { title, lastModifiedDate, storageUrl } = document;

          return (
            <Link key={storageUrl} to={`/documents/${title}`}>
              <FileGroup>
                <FileHeader>
                  <FileIcon src={documentIcon} alt="File icon" />
                  <FileTitle>{title}</FileTitle>
                </FileHeader>
                <FileDate>{lastModifiedDate.split("T", 1)}</FileDate>
              </FileGroup>
            </Link>
          );
        })}
      </DbFileWrapper>
    </Wrapper>
  );
}
const PdfInput = styled.input`
  display: none;
`;

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

const UploadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116px;
  height: 168px;
  margin: 20px;
  border: 1px dotted black;
  background-color: white;
  font-size: 20px;
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

const FileHeader = styled.div`
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
