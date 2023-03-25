import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalColor: "black",
  globalWidth: 3,
  globalOpacity: 1,
  currentEditorTool: "pencil",
  selectedPdfId: "",
  currentPdfPage: 1,
  wholePageNum: "",
  canvasDrawingArray: [],
  canvasRedoArray: [],
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
  fontUrl: "",
  fontName: "",
  drawingData: {
    1: [],
  },
  redoData: {
    1: [],
  },
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
      const { currentPage, points } = action.payload;
      state.canvasDrawingArray = [...state.canvasDrawingArray, points];
      state.drawingData[currentPage] = [
        ...state.drawingData[currentPage],
        points,
      ];
    },
    setDataUndo: (state, action) => {
      const { currentPage, restDrawingArray, poppedData } = action.payload;
      state.drawingData[currentPage] = restDrawingArray;
      state.redoData[currentPage] = [
        ...state.redoData[currentPage],
        poppedData,
      ];
    },
    setDataRedo: (state, action) => {
      const { currentPage, restRedoArray, poppedData } = action.payload;
      state.redoData[currentPage] = restRedoArray;
      state.drawingData[currentPage] = [
        ...state.drawingData[currentPage],
        poppedData,
      ];
    },
    setSelectedDocument: (state, action) => {
      state.selectedPdfId = action.payload;
    },
    setSelectedFontUrl: (state, action) => {
      state.fontUrl = action.payload;
    },
    setSelectedFontName: (state, action) => {
      state.fontName = action.payload;
    },
    setNextPage: (state) => {
      state.currentPdfPage += 1;
    },
    setPrevPage: (state) => {
      state.currentPdfPage -= 1;
    },
    setPageData: (state, action) => {
      const drawingData = {};
      const redoData = {};

      for (let i = 1; i <= action.payload; i += 1) {
        drawingData[i] = [];
        redoData[i] = [];
      }

      state.wholePageNum = action.payload;
      state.drawingData = drawingData;
      state.redoData = redoData;
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
  makeNewPostIt,
  setSelectedDocument,
  setSelectedFontUrl,
  setSelectedFontName,
  setPdfUnit8Array,
  setNextPage,
  setPrevPage,
  setPageData,
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
export const selectDocument = (state) => state.editor.selectedPdfId;
export const selectFontUrl = (state) => state.editor.fontUrl;
export const selectFontName = (state) => state.editor.fontName;
export const selectPdfUnit8Array = (state) => state.editor.pdfUnit8Array;
export const selectCurrentPage = (state) => state.editor.currentPdfPage;
export const selectWholePageNum = (state) => state.editor.wholePageNum;
export const selectDrawingData = (state) => state.editor.drawingData;
export const selectRedoData = (state) => state.editor.redoData;

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
  const currentPage = selectCurrentPage(getState());
  const drawingArray = selectDrawingData(getState())[currentPage];

  if (drawingArray.length) {
    const poppedData = drawingArray[drawingArray.length - 1];
    const restDrawingArray = drawingArray.slice(0, drawingArray.length - 1);

    dispatch(setDataUndo({ currentPage, restDrawingArray, poppedData }));
  }
};

export const moveDataRedoArray = () => (dispatch, getState) => {
  const currentPage = selectCurrentPage(getState());
  const redoArray = selectRedoData(getState())[currentPage];

  if (redoArray.length) {
    const poppedData = redoArray[redoArray.length - 1];
    const restRedoArray = redoArray.slice(0, redoArray.length - 1);

    dispatch(setDataRedo({ currentPage, restRedoArray, poppedData }));
  }
};

export const changePageNumber = (input) => (dispatch, getState) => {
  const wholePage = selectWholePageNum(getState());
  const currentPage = selectCurrentPage(getState());

  if (input === "next" && currentPage < wholePage) {
    dispatch(setNextPage());
  }

  if (input === "prev" && currentPage > 1) {
    dispatch(setPrevPage());
  }
};

export const pushDrawingDataCurrentPage = (points) => (dispatch, getState) => {
  const currentPage = selectCurrentPage(getState());

  dispatch(pushDrawingData({ currentPage, points }));
};

export default editorSlice.reducer;
