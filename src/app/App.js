import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Header from "../components/Header";
import OpenPdf from "../components/OpenPdf";
import Error from "../components/Error";
import Editor from "../components/Editor";
import Loading from "../components/Loading";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      {/* <OpenPdf /> */}
      {/* <Error /> */}
      <Editor />
      {/* <Loading /> */}
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  body {
    margin :0;
  }
`;
