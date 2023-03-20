import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import documentIcon from "../assets/documentIcon.svg";
import {
  selectUserId,
  setUserDocuments,
  selectDocuments,
  setErrorInfo,
} from "../feature/userSlice";

export default function OpenPdf() {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllDocumentsOfUser = async () => {
      try {
        const response = await axios(
          `http://localhost:4000/users/${userId}/documents`,
          {
            method: "GET",
            withCredentials: true,
            responseType: "json",
          },
        );
        if (response) {
          dispatch(setUserDocuments(response.data.documents));
        }
      } catch (error) {
        dispatch(setErrorInfo(error.response.data));
      }
    };

    getAllDocumentsOfUser();
  }, []);

  const navigate = useNavigate();
  const userDocuments = useSelector(selectDocuments);
  const pdfInput = useRef(null);

  const handleClickPdfUpload = () => {
    pdfInput.current.click();
  };

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);

    const response = await axios.post(`/users/${userId}/documents/new`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    const documentId = response.data.documents;

    navigate(`/documents/${documentId}`);
  };

  return (
    <Wrapper>
      <LocalFileWrapper>
        <Title>start with new document</Title>
        <PdfInput
          type="file"
          accept=".pdf"
          ref={pdfInput}
          onChange={handleChangeFile}
        />
        <UploadButton onClick={handleClickPdfUpload}>+</UploadButton>
      </LocalFileWrapper>
      <DbFileWrapper>
        <TitleGroup>
          <Title>my document</Title>
          <Title>last modified date</Title>
        </TitleGroup>
        {userDocuments.map((document) => {
          const { _id: documentId, title, lastModifiedDate } = document;

          return (
            <Link key={documentId} to={`/documents/${documentId}`}>
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
  text-transform: uppercase;
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
