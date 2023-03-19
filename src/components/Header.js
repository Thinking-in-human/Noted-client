import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  changeEditingUser,
  setErrorInfo,
  selectUserImgUrl,
} from "../feature/userSlice";

export default function Header() {
  const userImage = useSelector(selectUserImgUrl);

  const dispatch = useDispatch();

  const requestLogout = async () => {
    try {
      const response = await axios("http://localhost:4000/auth/sign-out", {
        method: "POST",
        responseType: "json",
        withCredentials: true,
      });

      if (response) {
        dispatch(
          changeEditingUser({
            userId: null,
            userImgUrl: null,
          }),
        );
      }
    } catch (error) {
      dispatch(setErrorInfo(error.response.data));
    }
  };

  return (
    <Wrapper>
      <Logo>
        <Link to="/">Noted</Link>
      </Logo>
      <NavWrapper>
        <NavButton>save</NavButton>
        <NavButton>open pdf</NavButton>
        <NavButton onClick={requestLogout}>logout →</NavButton>
        <UserProfile src={userImage} alt="userProfile"></UserProfile>
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
`;

const Logo = styled.div`
  font-size: 30px;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: 10px;
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
