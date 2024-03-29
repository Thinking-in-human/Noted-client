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
    opacity: 0.02,
  },
  postIts: {},
  postIt: {
    text: {
      contents: "",
      isBold: false,
      fontSize: "10px",
      fontUrl: "",
    },
  },
  postItPosition: {
    x: 60,
    y: 190,
  },
  postItFontSize: 10,
  madePostIts: {},
  drawingData: {
    1: [],
  },
  redoData: {
    1: [],
  },
  lastPostItPosition: {
    x: 60,
    y: 190,
  },
  currentPostIt: "",
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
    setPostIts: (state, action) => {
      const { currentPage, postItObject } = action.payload;
      const [postItId] = Object.keys(postItObject);
      state.currentPostIt = postItId;
      state.postItPosition.x += 5;
      state.postItPosition.y += 5;
      state.postIts[currentPage] = {
        ...state.postIts[currentPage],
        ...postItObject,
      };
    },
    setDeletePostIt: (state, action) => {
      const { currentPostIt, currentPage } = action.payload;
      delete state.postIts[currentPage][currentPostIt];
    },
    setPostItFontSize: (state, action) => {
      const { currentPage, changedSize, currentPostIt } = action.payload;
      state.postIts[currentPage][currentPostIt].fontSize = changedSize;
    },
    setBold: (state, action) => {
      state.postIt.text.isBold = action.payload;
    },
    changeContents: (state, action) => {
      const { currentPage, currentPostIt, contents } = action.payload;
      state.postIts[currentPage][currentPostIt].contents = contents;
    },
    goToNextPage: (state) => {
      state.currentPdfPage += 1;
    },
    goToPrevPage: (state) => {
      state.currentPdfPage -= 1;
    },
    setPageData: (state, action) => {
      const { documentId, numPages } = action.payload;
      const drawingData = {};
      const redoData = {};
      const postIts = {};

      for (let i = 1; i <= numPages; i += 1) {
        drawingData[i] = [];
        redoData[i] = [];
        postIts[i] = {};
      }

      state.selectedPdfId = documentId;
      state.wholePageNum = numPages;
      state.drawingData = drawingData;
      state.redoData = redoData;
      state.postIts = postIts;
    },
    setPostItPosition: (state, action) => {
      const { currentPage, currentPostIt, position } = action.payload;
      state.postIts[currentPage][currentPostIt].position = position;
    },
    setSelectedFontName: (state, action) => {
      const { currentPage, currentPostIt, selectedFont } = action.payload;
      state.postIts[currentPage][currentPostIt].fontName = selectedFont;
    },
    setCurrentPostIt: (state, action) => {
      state.currentPostIt = action.payload;
    },
    resetCurrentPage: (state, action) => {
      const currentPage = action.payload;
      state.drawingData[currentPage] = [];
      state.redoData[currentPage] = [];
      state.postIts[currentPage] = {};
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
  setSelectedFontName,
  setBold,
  setPdfUnit8Array,
  goToNextPage,
  goToPrevPage,
  setPageData,
  setPostItPosition,
  changeContents,
  setCurrentPostIt,
  resetCurrentPage,
} = editorSlice.actions;

export const selectPostItFontSize = (state) =>
  state.editor.postIt.text.fontSize;
export const selectCurrentEditorTool = (state) =>
  state.editor.currentEditorTool;
export const selectPencil = (state) => state.editor.pencil;
export const selectHighLightPen = (state) => state.editor.highLightPen;
export const selectGlobalColor = (state) => state.editor.globalColor;
export const selectGlobalWidth = (state) => state.editor.globalWidth;
export const selectGlobalOpacity = (state) => state.editor.globalOpacity;
export const selectDocument = (state) => state.editor.selectedPdfId;
export const selectPostIts = (state) => state.editor.postIts;
export const selectPostItPosition = (state) => state.editor.postItPosition;
export const selectIsBold = (state) => state.editor.postIt.text.isBold;
export const selectPdfUnit8Array = (state) => state.editor.pdfUnit8Array;
export const selectCurrentPage = (state) => state.editor.currentPdfPage;
export const selectWholePageNum = (state) => state.editor.wholePageNum;
export const selectDrawingData = (state) => state.editor.drawingData;
export const selectRedoData = (state) => state.editor.redoData;
export const selectLastPostItPosition = (state) =>
  state.editor.lastPostItPosition;
export const selectPostItContents = (state) =>
  state.editor.postIt.text.contents;
export const selectPostItText = (state) => state.editor.postIt.text;
export const selectCurrentPostIt = (state) => state.editor.currentPostIt;

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
