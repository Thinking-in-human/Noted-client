import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Login from "../components/Login";
import Header from "../components/Header";
import OpenPdf from "../components/OpenPdf";
import Editor from "../components/Editor";
import Loading from "../components/Loading";
import FallbackUI from "../components/FallbackUI";
import { selectEditingUserImgUrl } from "../feature/userSlice";

export default function App() {
  const loginUserImgUrl = useSelector(selectEditingUserImgUrl);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // if (!loginUserImgUrl) {
    //   navigate("/login");
    // }
  }, [navigate, loginUserImgUrl]);

  return (
    <>
      <GlobalStyle />

      {pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<OpenPdf />}></Route>
        <Route path="/documents/:title" element={<Editor />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {/* <FallbackUI /> */}
      {/* <Editor /> */}
      {/* <Loading /> */}
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
