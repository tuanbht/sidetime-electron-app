import React from "react";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import useAppContext from "../../../hooks/useAppContext";
import useModalContext from "../../../hooks/useModalContext";
import { X } from "react-feather";
import { useFormik } from "formik";
import { MarkAsCompleteModalPropsType } from "../../../types/components/CallRequestListItem";
import {
  goBackButtonStyles,
  refundCallButtonStyles,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  modalHeaderTypographyStyles,
  confirmMessageTypographyStyles,
  StyledContainer,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
} from "./styles";

const RefundCallModal: React.FC<MarkAsCompleteModalPropsType> = ({
  callRequest,
}) => {
  const { callRequestStore, notificationStore } = useAppContext();
  const modalContext = useModalContext();

  const form = useFormik({
    initialValues: {},
    onSubmit: () => {
      form.setSubmitting(true);
      callRequestStore
        .setCallRequestAsRefunded(callRequest)
        .then(() => {
          const message = `You have successfully refunded the call with ${callRequest.requester.name}`;
          notificationStore.setSuccessNotification(message);
          modalContext.close();
        })
        .finally(() => {
          form.setSubmitting(false);
        });
    },
  });

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="bold"
          text="Refund this call"
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
          text="Are you sure you want to refund this call?"
          css={confirmMessageTypographyStyles}
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
          isLoading={form.isSubmitting}
          disabled={form.isSubmitting}
          text="REFUND CALL"
          onClick={form.handleSubmit}
          css={refundCallButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default RefundCallModal;
