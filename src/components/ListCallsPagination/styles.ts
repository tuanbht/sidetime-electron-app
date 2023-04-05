import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
`;

export const ChevronIcon = styled.button`
  color: ${({ theme: { palette } }): string => palette.white};
  background-color: ${({ theme: { palette } }): string => palette.black};
  border-color: ${({ theme: { palette } }): string => palette.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: unset;
    pointer-events: none;
  }
`;

export const PaginationText = styled.div`
  margin: 0 40px 0 40px;
`
