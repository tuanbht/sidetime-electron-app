import React, { useEffect } from "react";
import Notification from "../Notification";
import useAppContext from "../../hooks/useAppContext";
import { observer } from "mobx-react-lite";
import { StyledContainer } from "./styles";
import { request } from "../../utils/axios";
import { AxiosError } from "axios";

const Layout: React.FC = (props) => {
  const {
    notificationStore: { notification },
    notificationStore,
    authStore,
    userStore,
  } = useAppContext();

  useEffect(() => {
    request.api().interceptors.response.use(undefined, (error: AxiosError) => {
      if (error.response?.status !== 500) return;

      notificationStore.setErrorNotification(
        "Oops, something went wrong! Please, try again later."
      );
    });
  }, [notificationStore]);

  useEffect(() => {
    authStore.checkLoggedInUser() && userStore.getCurrentUser();
  }, [authStore, authStore.currentUser, userStore])

  return (
    <StyledContainer>
      {notification ? <Notification notification={notification} /> : null}
      {props.children}
    </StyledContainer>
  );
};

export default observer(Layout);
