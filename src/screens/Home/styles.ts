import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export const CoverContainer = styled.div``;

export const SloganContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Cover = styled.img`
  z-index: -1;
  width: 100%;
  height: 90%;
  align-self: center;
`;

export const Logo = styled.img`
  align-self: center;
  margin-bottom: 30px;
`;

export const ReadyMessage = styled.h1`
  margin: 0px;
  padding-bottom: 50px;
  align-self: center;
`;

export const WelcomeMessage = styled.h1`
  margin: 0px;
  align-self: center;
  color: white;
`;

export const SloganMessage = styled.h3`
  margin: 0px;
  align-self: center;
  color: white;
`;
