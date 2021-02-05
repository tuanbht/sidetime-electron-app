import React from "react";
import Typography from "../Typography";
import Button from "../Button";
import useAppContext from "../../hooks/useAppContext";
import { CheckCircle, X, AlertCircle } from "react-feather";
import { NotificationPropsType } from "../../types/components/Notification";
import {
  StyledContainer,
  notificationMessageTypographyStyles,
  dismissButtonIconStyles,
  dismissButtonStyles,
  successNotificationIconStyles,
  errorNotificationIconStyles,
} from "./styles";

const Notification: React.FC<NotificationPropsType> = ({ notification }) => {
  const { notificationStore } = useAppContext();
  const renderNotificationIcon = () => {
    if (notification.type === "success") {
      return <CheckCircle size={24} style={successNotificationIconStyles} />;
    }
    if (notification.type === "error") {
      return <AlertCircle size={24} style={errorNotificationIconStyles} />;
    }
  };

  return (
    <StyledContainer>
      {renderNotificationIcon()}
      <Typography
        variant="regular"
        text={notification.message}
        css={notificationMessageTypographyStyles}
      />
      <Button
        icon={<X size={24} style={dismissButtonIconStyles} />}
        onClick={() => notificationStore.clearNotifications()}
        css={dismissButtonStyles}
      />
    </StyledContainer>
  );
};

export default Notification;
