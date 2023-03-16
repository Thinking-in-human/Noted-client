import React from "react";
import styled from "styled-components";

import userPic from "../assets/userPic.jpg";

export default function Header() {
  return (
    <Wrapper>
      <Logo>Noted</Logo>
      <NavWrapper>
        <NavButton>SAVE</NavButton>
        <NavButton>OPEN PDF</NavButton>
        <NavButton>LOGOUT →</NavButton>
        <UserProfile src={userPic} alt="userProfile"></UserProfile>
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
