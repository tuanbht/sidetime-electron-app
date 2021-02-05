import React, { useState } from "react";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import CalendarIcon from "../../CalendarIcon";
import useModalContext from "../../../hooks/useModalContext";
import useAppContext from "../../../hooks/useAppContext";
import dayjs from "dayjs";
import { X } from "react-feather";
import { getCallPartnerNameBasedOnPerspective } from "../../../utils/callrequest";
import { ProposedTimesModalPropsType } from "../../../types/components/CallRequestListItem";
import {
  StyledContainer,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  ProposedTimeContainer,
  ProposedTimesContainer,
  goBackButtonStyles,
  acceptButtonStyles,
  modalHeaderTypographyStyles,
  bodyTextTypographyStyles,
  proposedTimeTypographyStyles,
  proposedTimeTimezoneTypographyStyles,
  declineButtonStyles,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
  ProposedTimeRadioButton,
  ProposedHourContainer,
} from "./styles";

const ProposedTimesModal: React.FC<ProposedTimesModalPropsType> = ({
  callRequest,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>();
  const { callRequestStore, notificationStore, authStore } = useAppContext();
  const modalContext = useModalContext();

  const onAcceptButtonClick = () => {
    if (!selectedTime) return;
    callRequestStore
      .setCallRequestAsAccepted(callRequest, selectedTime)
      .then(() => {
        const message = `Call with ${renderCallPartnerName()} scheduled for ${dayjs(
          selectedTime
        ).format("dddd MMM DD YYYY HH:mm A")} `;

        modalContext.close();
        notificationStore.setSuccessNotification(message);
      });
  };

  const onDeclineButtonClick = () => {
    callRequestStore.setCallRequestAsDeclined(callRequest).then(() => {
      modalContext.close();
      notificationStore.setSuccessNotification("Call marked as declined");
    });
  };

  const renderCallPartnerName = () => {
    const { currentUser } = authStore;

    if (!currentUser) return "";
    return getCallPartnerNameBasedOnPerspective(callRequest, currentUser);
  };

  const renderProposedTimes = () => {
    const { proposed_times } = callRequest;

    return proposed_times.map((proposedTime) => (
      <ProposedTimeContainer>
        <ProposedTimeRadioButton
          type="radio"
          onClick={() => setSelectedTime(proposedTime)}
        />
        <CalendarIcon timestamp={proposedTime} />
        <ProposedHourContainer>
          <Typography
            variant="bold"
            text={dayjs(proposedTime).format("hh:mmA")}
            css={proposedTimeTypographyStyles}
          />
          <Typography
            variant="bold"
            text={authStore.currentUser?.timezone || ""}
            css={proposedTimeTimezoneTypographyStyles}
          />
        </ProposedHourContainer>
      </ProposedTimeContainer>
    ));
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="medium"
          text="Video call proposal"
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
          text={`${renderCallPartnerName()} would like to schedule a video call with you`}
          css={bodyTextTypographyStyles}
        />
        <Typography
          variant="regular"
          text={`Select a time that suits you most or proposed a new time.`}
          css={bodyTextTypographyStyles}
        />
        <Typography
          variant="bold"
          text="Proposed time(s):"
          css={bodyTextTypographyStyles}
        />
        <ProposedTimesContainer>{renderProposedTimes()}</ProposedTimesContainer>

        <HorizontalDivider />
      </ModalBodyContainer>
      <ModalFooterContainer>
        <>
          <Button
            text="GO BACK"
            onClick={() => modalContext.close()}
            buttonTextCss={goBackButtonTextStyles}
            css={goBackButtonStyles}
          />
        </>
        <Button
          text="DECLINE ALL"
          onClick={onDeclineButtonClick}
          css={declineButtonStyles}
        />
        <Button
          disabled={!selectedTime}
          text="ACCEPT SELECTED"
          onClick={onAcceptButtonClick}
          css={acceptButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default ProposedTimesModal;
