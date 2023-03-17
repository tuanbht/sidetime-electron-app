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
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
  ProposedTimeRadioButton,
  ProposedHourContainer,
} from "./styles";
import { getScheduledCallRequestMessage } from "../../../utils/notifications";
import useCallRequestItemContext from "../../../hooks/useCallRequestItemContext";

const ProposedTimesModal: React.FC<{ readOnly?: boolean }> = ({
  readOnly = false,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>();
  const { callRequestStore, notificationStore, authStore } = useAppContext();
  const { callRequest, updateCallRequest } = useCallRequestItemContext();
  const modalContext = useModalContext();

  const onAcceptButtonClick = () => {
    if (!selectedTime) return;
    callRequestStore
      .setCallRequestAsAccepted(callRequest, selectedTime)
      .then((response) => {
        const { currentUser } = authStore;
        const message = getScheduledCallRequestMessage(
          callRequest,
          currentUser,
          selectedTime
        );
        updateCallRequest(response);
        modalContext.close();
        notificationStore.setSuccessNotification(message);
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
    } would like to schedule a call with ${readOnly ? name : "you"}`;

    return message;
  };

  const renderProposedTimes = () => {
    const { proposedTimes } = callRequest;

    return proposedTimes.map((proposedTime) => {
      const parsed = dayjs(proposedTime).tz(authStore.timezone);

      return (
        <ProposedTimeContainer key={proposedTime}>
          {!readOnly ? (
            <ProposedTimeRadioButton
              type="radio"
              checked={selectedTime === proposedTime}
              onClick={() => setSelectedTime(proposedTime)}
            />
          ) : null}
          <CalendarIcon timestamp={proposedTime} />
          <ProposedHourContainer>
            <Typography
              variant="bold"
              text={parsed.format("hh:mmA")}
              css={proposedTimeTypographyStyles}
            />
            <Typography
              variant="bold"
              text={parsed.format("z")}
              css={proposedTimeTimezoneTypographyStyles}
            />
          </ProposedHourContainer>
        </ProposedTimeContainer>
      )
    });
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="medium"
          text="Proposed times"
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
