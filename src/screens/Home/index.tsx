import React from "react";
import logo from "../../assets/logo.png";
import cover from "../../assets/cover.png";
import {
  StyledContainer,
  CoverContainer,
  SloganContainer,
  FooterContainer,
  Cover,
  Logo,
  ReadyMessage,
  WelcomeMessage,
  SloganMessage,
} from "./styles";

const HomeScreen: React.FC = () => {
  return (
    <StyledContainer>
      <CoverContainer>
        <Cover src={cover} />
        <SloganContainer>
          <WelcomeMessage>Welcome to Sidetime</WelcomeMessage>
          <SloganMessage>
            Enabling expertise and mentorship for all.
          </SloganMessage>
        </SloganContainer>
      </CoverContainer>
      <FooterContainer>
        <ReadyMessage>Ready...</ReadyMessage>
        <Logo src={logo} />
      </FooterContainer>
    </StyledContainer>
  );
};

export default HomeScreen;
