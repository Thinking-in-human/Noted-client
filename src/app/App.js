import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import Login from "../components/Login";
import Header from "../components/Header";
import OpenPdf from "../components/OpenPdf";
import Editor from "../components/Editor";
import { selectUserId } from "../feature/userSlice";
import FallbackUI from "../components/FallbackUI";

export default function App() {
  const loginUserId = useSelector(selectUserId);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loginUserId) {
      navigate("/");
    }
  }, [navigate, loginUserId]);

  return (
    <>
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={FallbackUI}>
        {pathname !== "/login" && <Header />}
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
  @font-face {
    font-family: "DMSerifText-Regular";
    src: url("/fonts/DMSerifText-Regular.ttf") format("truetype");
  }
  body {
    font-family: "DMSerifText-Regular";
    margin: 0;
  }
`;
