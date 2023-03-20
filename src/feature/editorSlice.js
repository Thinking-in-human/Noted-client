import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPdf: {
    _id: "",
    pdf: "",
  },
  currentEditorTool: "pencil",
  pencil: {
    color: "black",
    width: "2px",
  },
  highLightPen: {
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
    setEditorTool: (state, action) => {
      state.currentEditorTool = action.payload;
    },
    setPencilWidth: (state, action) => {
      state.pencil.width = action.payload;
    },
    setPencilColor: (state, action) => {
      state.pencil.color = action.payload;
    },
  },
});

export const { setEditorTool, setPencilWidth, setPencilColor } =
  editorSlice.actions;

export const selectCurrentEditorTool = (state) =>
  state.editor.currentEditorTool;
export const selectPencilWidth = (state) => state.editor.pencil.width;
export const selectPencilColor = (state) => state.editor.pencil.color;

export default editorSlice.reducer;
