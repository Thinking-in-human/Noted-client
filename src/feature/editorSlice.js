import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalColor: "black",
  globalWidth: 3,
  globalOpacity: 1,
  currentEditorTool: "pencil",
  selectedPdfId: "",
  currentPdfPage: 1,
  wholePageNum: "",
  pencil: {
    color: "#000000",
    width: 4,
    opacity: 1,
  },
  highLightPen: {
    color: "#FFDC3C",
    width: 12,
    opacity: 0.03,
  },
  postIts: {
    id: {
      width: "300px",
      height: "300px",
      color: "yellow",
      contents: "",
      isBold: false,
    },
  },
  postIt: {
    text: {
      isBold: false,
    },
  },
  postItPosition: {
    x: 160,
    y: 190,
  },
  postItFontSize: 8,
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
      state.postIts = {};
    },
    setSelectedFontUrl: (state, action) => {
      state.fontUrl = action.payload;
    },
    setSelectedFontName: (state, action) => {
      state.fontName = action.payload;
    },
    setPostIts: (state, action) => {
      const postIt = action.payload;
      state.postItPosition.x += 5;
      state.postItPosition.y += 5;
      state.postIts = { ...state.postIts, ...postIt };
    },
    setDeletePostIt: (state, action) => {
      const postItId = action.payload;
      delete state.postIts[postItId];
    },
    setPostItFontSize: (state, action) => {
      state.postItFontSize = action.payload;
    },
    setBold: (state, action) => {
      state.postIt.text.isBold = action.payload;
    },
    goToNextPage: (state) => {
      state.currentPdfPage += 1;
    },
    goToPrevPage: (state) => {
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
  setPostItFontSize,
  setDeletePostIt,
  setPostIts,
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
  setBold,
  setPdfUnit8Array,
  goToNextPage,
  goToPrevPage,
  setPageData,
} = editorSlice.actions;

export const selectPostItFontSize = (state) => state.editor.postItFontSize;
export const selectCurrentEditorTool = (state) =>
  state.editor.currentEditorTool;
export const selectPencil = (state) => state.editor.pencil;
export const selectHighLightPen = (state) => state.editor.highLightPen;
export const selectGlobalColor = (state) => state.editor.globalColor;
export const selectGlobalWidth = (state) => state.editor.globalWidth;
export const selectGlobalOpacity = (state) => state.editor.globalOpacity;
export const selectDocument = (state) => state.editor.selectedPdfId;
export const selectFontUrl = (state) => state.editor.fontUrl;
export const selectFontName = (state) => state.editor.fontName;
export const selectPostIts = (state) => state.editor.postIts;
export const selectPostItPosition = (state) => state.editor.postItPosition;
export const selectIsBold = (state) => state.editor.postIt.text.isBold;
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
    dispatch(goToNextPage());
  }

  if (input === "prev" && currentPage > 1) {
    dispatch(goToPrevPage());
  }
};

export const pushDrawingDataCurrentPage = (points) => (dispatch, getState) => {
  const currentPage = selectCurrentPage(getState());

  dispatch(pushDrawingData({ currentPage, points }));
};

export default editorSlice.reducer;
