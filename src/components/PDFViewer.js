import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";

import Loading from "./Loading";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default function PDFViewer({ url }) {
  const [pdfDocument, setPdfDocument] = useState(null);

  useEffect(() => {
    const loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then((pdf) => {
      setPdfDocument(pdf);
    });
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

  return <div>{pages}</div>;
}
