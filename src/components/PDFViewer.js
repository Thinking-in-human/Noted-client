import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pdfjs from "pdfjs-dist";
import axios from "axios";

import { useErrorBoundary } from "react-error-boundary";
import Loading from "./Loading";
import Document from "./Document";
import { setPageData } from "../feature/editorSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function PDFViewer({ url, textBoxRef, onMouseUp, documentId }) {
  const [pdfDocument, setPdfDocument] = useState(null);
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

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
        const { numPages } = pdf;
        dispatch(setPageData({ documentId, numPages }));
      } catch (error) {
        showBoundary(error);
      }
    };

    loadPdf();
  }, [url]);

  if (pdfDocument) {
    return (
      <Document
        url={url}
        pdfDocument={pdfDocument}
        textBoxRef={textBoxRef}
        onMouseUp={onMouseUp}
      />
    );
  }
  return <Loading />;
}
