import React from "react";
import { observer } from "mobx-react-lite";
import Typography from "../../components/Typography";
import { StyledContainer } from "./styles";
import useAppContext from "../../hooks/useAppContext";

const LoginScreen: React.FC = () => {
  const { authStore } = useAppContext();

  return (
    <StyledContainer>
      <Typography variant="regular" text="Login Screen" />
    </StyledContainer>
  );
};

export default observer(LoginScreen);
