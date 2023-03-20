import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPdfId: null,
  currentEditorTool: null,
  pencil: {
    color: "black",
  },
  highlightPen: {
    color: "yellow",
    opacity: "0.4",
  },
  eraser: {
    width: "8px",
  },
  postIt: {
    id: null,
    width: "300px",
    height: "300px",
    color: "yellow",
    text: {
      contents: "",
      fontSize: "8px",
      bold: false,
      italic: false,
      font: "SerifText-Regular.woff2",
      color: "black",
    },
  },
  currentPostIt: null,
  madePostIts: {},
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setSelectedDocument: (state, action) => {
      state.selectedPdfId = action.payload;
    },
  },
});

export const { setSelectedDocument } = editorSlice.actions;

export const selectDocument = (state) => state.editor.selectedPdfId;

export default editorSlice.reducer;
