import styled, { css } from "styled-components";
import theme from "../../constants/theme";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
`;
export const LeftContainer = styled.div`
  margin-right: 25px;
`;
export const RightContainer = styled.div`
  width: 100%;
  max-width: 880px;
  background-color: ${({ theme: { palette } }): string => palette.white};
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ExpertContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BillingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const DurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24px;
`;
export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 24px;
`;
export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

export const CallNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const liveLabelTypographyStyles = css`
  font-size: 14px;
  line-height: 25px;
  width: 85px;
  height: 25px;
  margin-left: 10px;
  border-radius: 25px;
  text-align: center;
  color: ${({ theme: { palette } }): string => palette.white};
  background-color: ${({ theme: { palette } }): string => palette.orangish};
`;

export const callNameTypographyStyles = css`
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const callTimeTypographyStyles = css`
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const callTypeTypographStyles = css`
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme: { palette } }): string => palette.blueGrey};
`;

export const callBillingTypographStyles = css`
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const labelTypographStyles = css`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme: { palette } }): string => palette.blueGrey};
`;

export const callIconStyles: React.CSSProperties = {
  marginRight: "6px",
  color: theme.palette.slateGrey,
};
