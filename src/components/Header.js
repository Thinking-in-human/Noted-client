import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

import {
  selectDocument,
  selectDrawingData,
  selectLastPostItPosition,
  selectPostItText,
} from "../feature/editorSlice";
import {
  changeEditingUser,
  selectUserImgUrl,
  selectUserId,
} from "../feature/userSlice";
import saveCurrentPdf from "../utils/saveDrawing";
import CONSTANT from "../constants/constant";

export default function Header() {
  const userImage = useSelector(selectUserImgUrl);
  const documentId = useSelector(selectDocument);
  const userId = useSelector(selectUserId);
  const allDrawingData = useSelector(selectDrawingData);
  const postItPosition = useSelector(selectLastPostItPosition);
  const postItTextInfo = useSelector(selectPostItText);
  const { showBoundary } = useErrorBoundary();
  const dispatch = useDispatch();

  const requestLogout = async () => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_NOTED_API_SERVER}/auth/sign-out`,
        {
          method: "POST",
          responseType: "json",
          withCredentials: true,
        },
      );

      if (response) {
        dispatch(
          changeEditingUser({
            userId: null,
            userImgUrl: null,
          }),
        );
      }
    } catch (error) {
      showBoundary(error);
    }
  };

  const handleSavePdf = () => {
    try {
      saveCurrentPdf(
        userId,
        documentId,
        allDrawingData,
        CONSTANT,
        postItPosition,
        postItTextInfo,
      );
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <Wrapper>
      <Logo>
        <NavLink to="/">Noted</NavLink>
      </Logo>
      <NavWrapper>
        <NavButton onClick={handleSavePdf}>save</NavButton>
        <NavButton>
          <NavLink to="/open-pdf">open pdf</NavLink>
        </NavButton>
        <NavButton onClick={requestLogout}>logout →</NavButton>
        {userImage ? <UserProfile src={userImage} alt="userProfile" /> : null}
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fcfaf7;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
`;

const Logo = styled.div`
  font-size: 30px;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:active {
    color: #ffc0cb;
  }
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;

const NavLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: black;
  }
`;
