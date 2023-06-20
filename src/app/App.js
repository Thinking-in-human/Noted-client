import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import GlobalFonts from "../fonts/fonts";
import Login from "../components/Login";
import Header from "../components/Header";
import OpenPdf from "../components/OpenPdf";
import Editor from "../components/Editor";
import { selectUserId } from "../feature/userSlice";
import FallbackUI from "../components/FallbackUI";

export default function App() {
  const loginUserId = useSelector(selectUserId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUserId) {
      navigate("/");
    }
  }, [navigate, loginUserId]);

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={FallbackUI}>
        <Header />
        <Routes>
          <Route path="/open-pdf" element={<OpenPdf />} />
          <Route path="/documents/:documentId" element={<Editor />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "DMSerifText";
    margin: 0;
  }
`;
