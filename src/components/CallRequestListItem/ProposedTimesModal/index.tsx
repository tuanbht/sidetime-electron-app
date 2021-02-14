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
  readOnly = false,
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
        ).format("dddd MMM DD YYYY hh:mm A")} `;

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

  const renderBodyMessage = () => {
    const name = renderCallPartnerName();
    const message = `${
      readOnly ? "You" : name
    } would like to schedule a video call with ${readOnly ? name : "you"}`;

    return message;
  };

  const renderProposedTimes = () => {
    const { proposed_times } = callRequest;

    return proposed_times.map((proposedTime) => (
      <ProposedTimeContainer>
        {!readOnly ? (
          <ProposedTimeRadioButton
            type="radio"
            checked={selectedTime === proposedTime}
            onChange={() => {}}
            onClick={() => setSelectedTime(proposedTime)}
          />
        ) : null}
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
          text={renderBodyMessage()}
          css={bodyTextTypographyStyles}
        />
        <Typography
          variant="regular"
          text={
            readOnly
              ? "Check the proposed times bellow."
              : "Select a time that suits you most or proposed a new time."
          }
          css={bodyTextTypographyStyles}
        />
        <Typography
          variant="bold"
          text="Proposed time(s):"
          css={bodyTextTypographyStyles}
        />
        <ProposedTimesContainer>{renderProposedTimes()}</ProposedTimesContainer>
      </ModalBodyContainer>
      {!readOnly ? (
        <>
          <HorizontalDivider />
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
        </>
      ) : null}
    </StyledContainer>
  );
};

export default ProposedTimesModal;
