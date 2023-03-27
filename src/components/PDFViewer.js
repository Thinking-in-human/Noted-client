import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as pdfjs from "pdfjs-dist";
import axios from "axios";

import Loading from "./Loading";
import Document from "./Document";
import { setErrorInfo } from "../feature/userSlice";
import { setPageData } from "../feature/editorSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function PDFViewer({ url }) {
  const [pdfDocument, setPdfDocument] = useState(null);
  const dispatch = useDispatch();

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

  if (pdfDocument) {
    const { numPages } = pdfDocument;
    dispatch(setPageData(numPages));
    return <Document url={url} pdfDocument={pdfDocument} />;
  }
  return <Loading />;
}
