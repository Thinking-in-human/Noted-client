import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUserId: null,
  loginUserImgUrl: null,
  userDocuments: [],
  errorInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeEditingUser: (state, action) => {
      const { userId, userImgUrl } = action.payload;

      state.loginUserImgUrl = userImgUrl;
      state.loginUserId = userId;
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

export const selectUserId = (state) => state.user.loginUserId;
export const selectUserImgUrl = (state) => state.user.loginUserImgUrl;
export const selectDocuments = (state) => state.user.userDocuments;
export const selectError = (state) => state.user.errorInfo;

export default userSlice.reducer;
