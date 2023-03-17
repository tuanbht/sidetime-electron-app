import React from "react";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import useAppContext from "../../../hooks/useAppContext";
import useModalContext from "../../../hooks/useModalContext";
import { X } from "react-feather";
import {
  goBackButtonStyles,
  markAsCompleteButtonStyles,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  modalHeaderTypographyStyles,
  disclaimerTypographyStyles,
  StyledContainer,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
} from "./styles";
import useCallRequestItemContext from "../../../hooks/useCallRequestItemContext";

const MarkAsCompleteModal: React.FC = () => {
  const { callRequestStore, notificationStore } = useAppContext();
  const modalContext = useModalContext();
  const { callRequest, updateCallRequest } = useCallRequestItemContext();

  const onMarkAsComplete = () => {
    callRequestStore.setCallRequestAsFinished(callRequest).then((response) => {
      updateCallRequest(response);
      modalContext.close();
      notificationStore.setSuccessNotification("Call marked as finished");
    });
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="bold"
          text="Mark the call as complete"
          css={modalHeaderTypographyStyles}
        />
        <Button
          icon={<X style={closeButtonIconStyles} />}
          onClick={() => modalContext.close()}
          css={closeButtonStyles}
        />
      </ModalHeaderContainer>
      <HorizontalDivider />
      <ModalBodyContainer>
        <Typography
          variant="regular"
          text="Are you sure you want to mark this call as complete?"
          css={disclaimerTypographyStyles}
        />
        <Typography
          variant="regular"
          text="Please note that it won't be possible to refund this call after it has been marked as complete"
          css={disclaimerTypographyStyles}
        />
      </ModalBodyContainer>
      <ModalFooterContainer>
        <Button
          text="GO BACK"
          onClick={() => modalContext.close()}
          buttonTextCss={goBackButtonTextStyles}
          css={goBackButtonStyles}
        />
        <Button
          text="MARK AS COMPLETE"
          onClick={onMarkAsComplete}
          css={markAsCompleteButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default MarkAsCompleteModal;
