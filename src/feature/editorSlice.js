import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalColor: "black",
  globalWidth: 3,
  globalOpacity: 1,
  currentEditorTool: "pencil",
  canvasDrawingArray: [],
  canvasRedoArray: [],
  drawingArrayIndex: 0,
  currentDrawingIndex: 0,
  pencil: {
    color: "black",
    width: 3,
    opacity: 1,
  },
  highLightPen: {
    color: "yellow",
    width: 10,
    opacity: 0.03,
  },
  eraser: {
    width: 8,
  },
  postIt: {
    id: null,
    width: "300px",
    height: "300px",
    color: "yellow",
    text: {
      contents: "",
      fontSize: 8,
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
      state.globalWidth = action.payload;
      state.pencil.width = action.payload;
    },
    setPencilColor: (state, action) => {
      state.globalColor = action.payload;
      state.pencil.color = action.payload;
    },
    setHighLightWidth: (state, action) => {
      state.globalWidth = action.payload;
      state.highLightPen.width = action.payload;
    },
    setHighLightColor: (state, action) => {
      state.globalColor = action.payload;
      state.highLightPen.color = action.payload;
    },
    setGlobalStyle: (state, action) => {
      const { tool, color, width, opacity } = action.payload;

      state.currentEditorTool = tool;
      state.globalColor = color;
      state.globalWidth = width;
      state.globalOpacity = opacity;
    },
    pushDrawingData: (state, action) => {
      state.canvasDrawingArray = [...state.canvasDrawingArray, action.payload];
    },
    setDataUndo: (state, action) => {
      const { restDrawingArray, poppedData } = action.payload;
      state.canvasDrawingArray = restDrawingArray;
      state.canvasRedoArray = [...state.canvasRedoArray, poppedData];
    },
    setDataRedo: (state, action) => {
      const { restRedoArray, poppedData } = action.payload;
      state.canvasRedoArray = restRedoArray;
      state.canvasDrawingArray = [...state.canvasDrawingArray, poppedData];
    },
  },
});

export const {
  setEditorTool,
  setPencilWidth,
  setPencilColor,
  setHighLightWidth,
  setHighLightColor,
  setGlobalStyle,
  pushDrawingData,
  setDataUndo,
  setDataRedo,
} = editorSlice.actions;

export const selectCurrentEditorTool = (state) =>
  state.editor.currentEditorTool;
export const selectPencilWidth = (state) => state.editor.pencil.width;
export const selectHighlightWidth = (state) => state.editor.highLightPen.width;
export const selectGlobalColor = (state) => state.editor.globalColor;
export const selectGlobalWidth = (state) => state.editor.globalWidth;
export const selectGlobalOpacity = (state) => state.editor.globalOpacity;
export const selectDrawingArray = (state) => state.editor.canvasDrawingArray;
export const selectRedoArray = (state) => state.editor.canvasRedoArray;

export const changeGlobalToolOption = (tool) => (dispatch, getState) => {
  const selectToolColor = (state) => state.editor[tool].color;
  const selectToolWidth = (state) => state.editor[tool].width;
  const selectToolOpacity = (state) => state.editor[tool].opacity;

  const color = selectToolColor(getState());
  const width = selectToolWidth(getState());
  const opacity = selectToolOpacity(getState());

  dispatch(setGlobalStyle({ tool, color, width, opacity }));
};

export const moveDataUndoArray = () => (dispatch, getState) => {
  const drawingArray = selectDrawingArray(getState());

  if (drawingArray.length) {
    const poppedData = drawingArray[drawingArray.length - 1];
    const restDrawingArray = drawingArray.slice(0, drawingArray.length - 1);

    dispatch(setDataUndo({ restDrawingArray, poppedData }));
  }
};

export const moveDataRedoArray = () => (dispatch, getState) => {
  const redoArray = selectRedoArray(getState());

  if (redoArray.length) {
    const poppedData = redoArray[redoArray.length - 1];
    const restRedoArray = redoArray.slice(0, redoArray.length - 1);

    dispatch(setDataRedo({ restRedoArray, poppedData }));
  }
};

export default editorSlice.reducer;
