import styled from "styled-components";

const HorizontalDivider = styled.div`
  height: 1px;
  margin: 15px 0px;
  background-color: ${({ theme: { palette } }): string => palette.grey50};
`;

export default HorizontalDivider;
