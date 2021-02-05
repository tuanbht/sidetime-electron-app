import styled, { css } from "styled-components";
import theme from "../../../../constants/theme";

export const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
`;

export const CallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
`;

export const TopContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-end;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenterActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  min-width: 310px;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: flex-end;
  min-width: 80px;
`;
export const CounterContainer = styled.div`
  display: inline-grid;
  text-align: center;
`;

export const Camera = styled.video`
  height: 170px;
`;

export const CameraPlaceholder = styled.img`
  width: 270px;
  height: 170px;
`;

export const ScreensContainer = styled.div`
  margin-bottom: 20px;
`;

export const Screen = styled.img`
  height: 100px;
  margin-right: 20px;
  &:hover {
    border: solid 2px ${({ theme: { palette } }) => palette.orangish};
  }
`;

export const CommentsContainer = styled.div`
  background-color: ${({ theme: { palette } }) => palette.white};
  position: relative;
  width: 400px;
  height: 100vh;
`;

export const CommentsListContainer = styled.div``;
export const CommentInputContainer = styled.div`
  flex-direction: column;
  height: 150px;
`;

export const minutesRemaningTypographyStyles = css`
  font-size: 12px;
  line-height: 12px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.white};
`;

export const endCallButtonStyles = css`
  width: 130px;
  height: 35px;
  margin-top: 12px;
  background-color: ${({ theme: { palette } }): string => palette.red};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.redActive};
  }
`;

export const onActionButtonStyles = css`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme: { palette } }): string => palette.grey50};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
`;

export const offActionButtonStyles = css`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme: { palette } }): string => palette.slateGrey};
  &:hover {
    background-color: ${({ theme: { palette } }): string =>
      palette.slateGreyActive};
  }
`;

export const onActionIconStyles: React.CSSProperties = {
  strokeWidth: "1px",
};

export const offActionIconStyles: React.CSSProperties = {
  color: theme.palette.white,
  strokeWidth: "1px",
};
