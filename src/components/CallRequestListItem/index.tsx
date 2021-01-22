import React from "react";
import dayjs from "dayjs";
import Button from "../Button";
import Typography from "../Typography";
import VerticalDivider from "../VerticalDivider";
import HorizontalDivider from "../HorizontalDivider";
import CalendarIcon from "../CalendarIcon";
import useAppContext from "../../hooks/useAppContext";
import { CallRequestListItemPropsType } from "../../types/components/CallRequestListItem";
import { useHistory } from "react-router-dom";
import {
  Video,
  Phone,
  PhoneCall,
  MessageCircle,
  Check,
  XOctagon,
  Calendar
} from "react-feather";
import {
  LeftContainer,
  RightContainer,
  ExpertContainer,
  InfoContainer,
  TimeContainer,
  BillingContainer,
  DurationContainer,
  PriceContainer,
  ActionsContainer,
  CallNameContainer,
  StyledContainer,
  liveLabelTypographyStyles,
  callIconStyles,
  actionIconStyles,
  actionButtonStyles,
  joinCallIconStyles,
  deleteButtonStyles,
  declineButtonStyles,
  deleteIconStyles,
  declineIconStyles,
  proposedTimesButtonStyles,
  declineButtonTextStyles,
  joinCallButtonStyles,
  callTimeTypographyStyles,
  callNameTypographyStyles,
  callTypeTypographStyles,
  callBillingTypographStyles,
  labelTypographStyles,
} from "./styles";
import {
  CALL_REQUEST_LIVE,
  CALL_REQUEST_PENDING_EXPERT,
  CALL_REQUEST_PENDING_REQUESTER,
  CALL_REQUEST_SCHEDULED,
} from "../../constants/states";

const CallRequestListItem: React.FC<CallRequestListItemPropsType> = ({
  callRequest,
}) => {
  const history = useHistory();
  const {
    callRequestStore,
    authStore: { currentUser },
  } = useAppContext();
  const {
    videoconference,
    expert,
    call_type,
    scheduled_at,
    duration_in_mins,
    price_cents,
    proposed_times,
  } = callRequest;

  const getCallRequestTimestamp = () => {
    return scheduled_at || proposed_times[0] || "";
  };

  const getCallRequestTime = () => {
    const timestamp = getCallRequestTimestamp();
    return dayjs(timestamp).format("hh:mmA");
  };

  const renderActions = () => {
    let actions = [];

    actions.push(
      <Button
        key={`messages-${callRequest.id}`}
        icon={<MessageCircle size={16} style={actionIconStyles} />}
        onClick={() => {}}
        css={actionButtonStyles}
      />
    );

    if ([CALL_REQUEST_PENDING_REQUESTER].includes(callRequest.status)) {
      actions = actions.concat(
        <Button
          key={`decline-${callRequest.id}`}
          icon={<XOctagon size={16} style={declineIconStyles} />}
          text={"DECLINE"}
          onClick={() => {}}
          css={declineButtonStyles}
          buttonTextCss={declineButtonTextStyles}
        />,
        <Button
          key={`proposed-times-${callRequest.id}`}
          text={"VIEW PROPOSED TIMES"}
          onClick={() => {}}
          css={proposedTimesButtonStyles}
        />
      );
    }

    if (
      [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_SCHEDULED].includes(
        callRequest.status
      )
    ) {
      actions = actions.concat(
        <Button
          key={`delete-${callRequest.id}`}
          icon={<XOctagon size={16} style={deleteIconStyles} />}
          onClick={() => {}}
          css={deleteButtonStyles}
        />,
        <Button
          key={`reschedule-${callRequest.id}`}
          icon={<Calendar size={16} style={actionIconStyles} />}
          onClick={() => {}}
          css={actionButtonStyles}
        />
      );
    }

    if ([CALL_REQUEST_LIVE].includes(callRequest.status)) {
      actions = actions.concat(
        <Button
          key={`done-${callRequest.id}`}
          icon={<Check size={16} style={actionIconStyles} />}
          onClick={() => {}}
          css={actionButtonStyles}
        />,
        <Button
          key={`join-${callRequest.id}`}
          icon={<PhoneCall size={16} style={joinCallIconStyles} />}
          text={"JOIN CALL"}
          onClick={() => {
            callRequestStore.setCallRequest(callRequest);
            history.push(`/call_requests/${callRequest.id}`);
          }}
          css={joinCallButtonStyles}
        />
      );
    }

    return actions;
  };

  return (
    <StyledContainer>
      <LeftContainer>
        <CalendarIcon timestamp={getCallRequestTimestamp()} />
      </LeftContainer>
      <RightContainer>
        <InfoContainer>
          <ExpertContainer>
            <CallNameContainer>
              {videoconference ? (
                <Video size={24} style={callIconStyles} />
              ) : (
                <Phone size={24} style={callIconStyles} />
              )}
              <Typography
                variant="medium"
                text={`${videoconference ? "Video Call" : "Phone Call "} with ${
                  expert.name
                }`}
                css={callNameTypographyStyles}
              />
              {callRequest.status === CALL_REQUEST_LIVE ? (
                <Typography
                  variant="bold"
                  text="Live"
                  css={liveLabelTypographyStyles}
                />
              ) : null}
            </CallNameContainer>
            <Typography
              variant="semiBold"
              text={call_type}
              css={callTypeTypographStyles}
            />
          </ExpertContainer>
          <TimeContainer>
            <Typography
              variant="bold"
              text={getCallRequestTime()}
              css={callTimeTypographyStyles}
            />
            <Typography
              variant="bold"
              text={currentUser?.timezone || ""}
              css={labelTypographStyles}
            />
          </TimeContainer>
        </InfoContainer>
        <HorizontalDivider />
        <BillingContainer>
          <DurationContainer>
            <Typography
              variant="bold"
              text={`${duration_in_mins}min`}
              css={callBillingTypographStyles}
            />
            <Typography
              variant="bold"
              text="CALL DURATION"
              css={labelTypographStyles}
            />
          </DurationContainer>
          <VerticalDivider />
          <PriceContainer>
            <Typography
              variant="bold"
              text={`$${((duration_in_mins * price_cents) / 100).toFixed(2)}`}
              css={callBillingTypographStyles}
            />
            <Typography
              variant="bold"
              text="CALL PRICE"
              css={labelTypographStyles}
            />
          </PriceContainer>
          <ActionsContainer>{renderActions()}</ActionsContainer>
        </BillingContainer>
      </RightContainer>
    </StyledContainer>
  );
};

export default CallRequestListItem;
