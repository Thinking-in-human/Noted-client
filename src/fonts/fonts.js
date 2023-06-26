import { createGlobalStyle } from "styled-components";
import DMSerifText from "./DMSerifText-Regular.ttf";

export default createGlobalStyle`
  @font-face {
    font-family: "Fasthand";
    src: url("https://notedfonts.s3.amazonaws.com/Fasthand.woff2") format("woff2");
  }
  @font-face {
    font-family: "Jamsil";
    src: url("https://notedfonts.s3.amazonaws.com/Jamsil.woff2") format("woff2");
  }
  @font-face {
    font-family: "KCCChassam";
    src: url("https://notedfonts.s3.amazonaws.com/KCCChassam.woff2") format("woff2");
  }
  @font-face {
    font-family: "MavenPro";
    src: url("https://notedfonts.s3.amazonaws.com/MavenPro.woff2") format("woff2");
  }
  @font-face {
    font-family: "PlayfairDisplay";
    src: url("https://notedfonts.s3.amazonaws.com/PlayfairDisplay.woff2") format("woff2");
  }
  @font-face {
    font-family: "RubikIso";
    src: url("https://notedfonts.s3.amazonaws.com/RubikIso.woff2") format("woff2");
  }
  @font-face {
    font-family: "Roboto";
    src: url("https://notedfonts.s3.amazonaws.com/Roboto.woff2") format("woff2");
  }
  @font-face {
    font-family: "Rubik";
    src: url("https://notedfonts.s3.amazonaws.com/Rubik.woff2") format("woff2");
  }
  @font-face {
    font-family: "DMSerifText";
    src: local("GmarketSansTTFBold"), local("DMSerifText");
    src: url(${DMSerifText}) format("truetype");
  }
`;
