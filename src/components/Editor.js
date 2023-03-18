import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Document from "./Document";
import PDFViewer from "./PDFViewer";

export default function Editor() {
  const { title } = useParams();
  const [url, setUrl] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(`/documents/${title}`);
      const data = res.json();
    })();
  }, [title]);

  return (
    <Wrapper>
      <Sidebar />
      {/* <Document /> */}
      <PDFViewer url="http://localhost:3000/test.pdf" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;
