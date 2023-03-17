import React from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

import Login from "../components/Login";
import Header from "../components/Header";
import OpenPdf from "../components/OpenPdf";
import Editor from "../components/Editor";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { selectEditingUserImgUrl } from "../feature/userSlice";

export default function App() {
  const loginUserImgUrl = useSelector(selectEditingUserImgUrl);
  return (
    <>
      <GlobalStyle />
      {!loginUserImgUrl ? (
        <Login />
      ) : (
        <>
          <Header />
          <OpenPdf />
        </>
      )}
      {/* <Error /> */}
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
