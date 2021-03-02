import styled from "styled-components";

export const StyledContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RemoteVideo = styled.video`
  height: 100%;
  width: 100%;
`;

export const RemoteWebCam = styled.video`
  position: absolute;
  z-index: 10;
  top: 220px;
  right: 30px;
  height: 170px;
`;
