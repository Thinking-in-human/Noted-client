import React from "react";
import styled from "styled-components";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import pdfImage from "../assets/pdfImage.png";
import { firebaseAuth } from "../app/firebaseAuth";
import { changeEditingUser, setErrorInfo } from "../feature/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const { user } = result;

      const customedUserObject = {
        email: user.email,
        avatarImgURL: user.photoURL,
      };

      const response = await axios("http://localhost:4000/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        responseType: "json",
        data: customedUserObject,
        withCredentials: true,
      });

      if (response) {
        dispatch(
          changeEditingUser({
            userImgUrl: user.photoURL,
            userId: response.data.userId,
          }),
        );
      }

      navigate("/");
    } catch (error) {
      dispatch(setErrorInfo(error.response.data));
    }
  };

  return (
    <Wrapper>
      <BackgoundColorPage />
      <MainImage src={pdfImage} alt="Main Page" />
      <FirstLineTitle>Find your creativity by</FirstLineTitle>
      <SecondLineTitle>pdf editor, Noted</SecondLineTitle>
      <LoginButton onClick={signInWithGoogle}>Login →</LoginButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const BackgoundColorPage = styled.div`
  width: 90%;
  height: 90%;
  margin-left: 3%;
  background-color: #f9f5f2;
`;

const FirstLineTitle = styled.div`
  position: absolute;
  top: 30%;
  left: 45%;
  font-size: 400%;
`;

const SecondLineTitle = styled.div`
  position: absolute;
  top: 41%;
  left: 60%;
  font-size: 400%;
`;

const MainImage = styled.img`
  position: absolute;
  left: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LoginButton = styled.div`
  position: absolute;
  top: 58%;
  left: 78%;
  padding: 3px 20px;
  border: 1px solid black;
  background: none;
  font-size: 200%;
  cursor: pointer;

  &:active {
    color: #ffc0cb;
  }
`;
