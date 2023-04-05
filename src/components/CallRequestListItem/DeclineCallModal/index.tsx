import React from "react";
import dayjs from "dayjs";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import useAppContext from "../../../hooks/useAppContext";
import useModalContext from "../../../hooks/useModalContext";
import { X } from "react-feather";
import { useFormik } from "formik";
import {
  StyledContainer,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  ProposedTimeContainer,
  goBackButtonStyles,
  declineButtonStyles,
  modalHeaderTypographyStyles,
  bodyTextTypographyStyles,
  proposedTimeTypographyStyles,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
} from "./styles";
import useCallRequestItemContext from "../../../hooks/useCallRequestItemContext";

const DeclineCallModal: React.FC = () => {
  const { callRequestStore, notificationStore, authStore: { timezone } } = useAppContext();
  const modalContext = useModalContext();
  const { callRequest, updateCallRequest } = useCallRequestItemContext();
  const declineForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      declineForm.setSubmitting(true);
      callRequestStore
        .setCallRequestAsDeclined(callRequest)
        .then((response) => {
          // TODO: Replace call request with new response for new serializers
          updateCallRequest(callRequest);
          modalContext.close();
          notificationStore.setSuccessNotification("Call marked as declined");
        })
        .finally(() => {
          declineForm.setSubmitting(false);
        });
    },
  });

  const renderProposedTimes = () => {
    if (callRequest.proposedTimes.length === 0) return null;

    return (
      <>
        <Typography
          variant="bold"
          text="Proposed time(s):"
          css={bodyTextTypographyStyles}
        />
        {callRequest.proposedTimes.map((proposedTime, index) => {
          return (
            <div key={index}>
              <ProposedTimeContainer >
                <Typography
                  variant="regular"
                  text={dayjs(proposedTime).tz(timezone).format("dddd MMM DD YYYY hh:mm A")}
                  css={proposedTimeTypographyStyles}
                />
              </ProposedTimeContainer>
              <HorizontalDivider />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="medium"
          text="Decline all proposed times"
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
        {renderProposedTimes()}
      </ModalBodyContainer>
      <ModalFooterContainer>
        <Button
          text="GO BACK"
          onClick={() => modalContext.close()}
          buttonTextCss={goBackButtonTextStyles}
          css={goBackButtonStyles}
        />
        <Button
          text="DECLINE ALL"
          disabled={declineForm.isSubmitting}
          isLoading={declineForm.isSubmitting}
          onClick={declineForm.handleSubmit}
          css={declineButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default DeclineCallModal;
