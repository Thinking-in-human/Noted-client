import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pdfjs from "pdfjs-dist";
import axios from "axios";

import Loading from "./Loading";
import { setErrorInfo } from "../feature/userSlice";
import { selectPostIts } from "../feature/editorSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function PDFViewer({ url }) {
  const [pdfDocument, setPdfDocument] = useState(null);
  const dispatch = useDispatch();
  const postIts = useSelector(selectPostIts);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await axios(url, {
          method: "GET",
          withCredentials: true,
          responseType: "arraybuffer",
        });
        const selectDocuments = new Uint8Array(response.data);
        const pdf = await pdfjs.getDocument(selectDocuments).promise;
        setPdfDocument(pdf);
      } catch (error) {
        dispatch(setErrorInfo(error.response?.data));
      }
    };

    loadPdf();
  }, [url]);

  if (!pdfDocument) {
    return <Loading />;
  }

  const { numPages } = pdfDocument;
  const pages = [];

  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <canvas
        key={`page_${i}`}
        style={{ border: "1px solid black" }}
        ref={async (canvas) => {
          if (canvas) {
            const page = await pdfDocument.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({
              canvasContext: canvas.getContext("2d"),
              viewport,
            });
          }
        }}
      />,
    );
  }

  return (
    <div>
      {postIts.map((postIt) => postIt)}
      {pages}
    </div>
  );
}
