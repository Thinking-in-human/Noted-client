import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUserImgUrl: null,
  userDocuments: [
    {
      _id: "641342b3983628e60d765d95",
      title: "sample",
      lastModifiedDate: "2023-03-16T16:24:19.930Z",
      storageUrl: "documents/sample.pdf",
    },
  ],
  errorInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeEditingUser: (state, action) => {
      state.loginUserImgUrl = action.payload;
    },
    setUserDocuments: (state, action) => {
      state.userDocuments = action.payload;
    },
    setErrorInfo: (state, action) => {
      state.errorInfo = action.payload;
    },
  },
});

export const { changeEditingUser, setUserDocuments, setErrorInfo } =
  userSlice.actions;

export const selectEditingUserImgUrl = (state) => state.user.loginUserImgUrl;
export const selectDocuments = (state) => state.user.userDocuments;
export const selectError = (state) => state.user.errorInfo;

export default userSlice.reducer;
