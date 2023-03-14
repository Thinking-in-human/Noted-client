import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Header from "../components/Header";
import OpenPdf from "../components/OpenPdf";
import Error from "../components/Error";
import Editor from "../components/Editor";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      {/* <OpenPdf /> */}
      {/* <Error /> */}
      <Editor />
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  body {
    margin :0;
  }
`;
