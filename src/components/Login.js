import React from "react";
import styled from "styled-components";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

import pdfImage from "../assets/pdfImage.png";
import { firebaseAuth } from "../app/firebaseAuth";
import { changeEditingUser } from "../feature/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const { showBoundary } = useErrorBoundary();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const { user } = result;

      const customedUserObject = {
        email: user.email,
        avatarImgURL: user.photoURL,
      };

      const response = await axios(
        `${process.env.REACT_APP_NOTED_API_SERVER}/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          responseType: "json",
          data: customedUserObject,
          withCredentials: true,
        },
      );

      if (response) {
        dispatch(
          changeEditingUser({
            userImgUrl: user.photoURL,
            userId: response.data.userId,
          }),
        );
      }

      navigate("/open-pdf");
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <Wrapper>
      <BackgoundColorPage />
      <MobileTitle>Sorry,</MobileTitle>
      <MobileText>
        We do not support mobile service.
        <br />
        please try on PC or laptop.
      </MobileText>
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
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    font-size: 5vw;
  }
`;

const SecondLineTitle = styled.div`
  position: absolute;
  top: 41%;
  left: 60%;
  font-size: 400%;
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    font-size: 5vw;
  }
`;

const MainImage = styled.img`
  position: absolute;
  left: 5%;
  @media screen and (max-width: 768px) {
    display: none;
  }
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

  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    font-size: 2.5vw;
  }
`;

const MobileTitle = styled.p`
  position: absolute;
  top: 15%;
  left: 10%;
  z-index: 1;
  font-size: 40px;
  font-weight: 800;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileText = styled.p`
  position: absolute;
  top: 30%;
  left: 10%;
  z-index: 1;
  font-size: 18px;
  font-weight: 800;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
