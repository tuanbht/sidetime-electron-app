import React, { useRef } from "react";
import dayjs from "dayjs";
import Typography from "../Typography";
import VerticalDivider from "../VerticalDivider";
import HorizontalDivider from "../HorizontalDivider";
import CalendarIcon from "../CalendarIcon";
import Modal, { ModalInterface } from "../Modal";
import MarkAsCompleteModal from "./MarkAsCompleteModal";
import RescheduleCallModal from "./RescheduleCallModal";
import ProposedTimesModal from "./ProposedTimesModal";
import DeclineCallModal from "./DeclineCallModal";
import CancelCallModal from "./CancelCallModal";
import RefundCallModal from "./RefundCallModal";
import useAppContext from "../../hooks/useAppContext";
import { CallRequestListItemPropsType } from "../../types/components/CallRequestListItem";
import { useHistory } from "react-router-dom";
import { Video, Phone } from "react-feather";
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
  callTimeTypographyStyles,
  callNameTypographyStyles,
  callTypeTypographStyles,
  callBillingTypographStyles,
  minutesRemainingTypographStyles,
  labelTypographStyles,
} from "./styles";
import { CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED } from "../../constants/states";
import {
  DECLINE_CALL_BUTTON,
  VIEW_CALL_PROPOSED_TIMES_BUTTON,
  CHECK_CALL_PROPOSED_TIMES_BUTTON,
  CANCEL_CALL_BUTTON,
  RESCHEDULE_CALL_BUTTON,
  MARK_CALL_FINISHED_BUTTON,
  JOIN_CALL_BUTTON,
} from "./ActionButtons";
import { getCallPartnerNameBasedOnPerspective } from "../../utils/callrequest";

const CallRequestListItem: React.FC<CallRequestListItemPropsType> = ({
  callRequest,
}) => {
  const markAsCompleteModalRef = useRef<ModalInterface>(null);
  const rescheduleCallRef = useRef<ModalInterface>(null);
  const acceptProposedTimesRef = useRef<ModalInterface>(null);
  const checkProposedTimesRef = useRef<ModalInterface>(null);
  const declineCallRef = useRef<ModalInterface>(null);
  const cancellCallRef = useRef<ModalInterface>(null);
  const refundCallRef = useRef<ModalInterface>(null);

  const history = useHistory();
  const {
    authStore: { currentUser },
  } = useAppContext();
  const {
    id,
    videoconference,
    status,
    call_type,
    scheduled_at,
    duration_in_mins,
    proposed_times,
    total_cost_cents,
    minutes_used,
  } = callRequest;

  const getCallRequestTimestamp = () => {
    if (scheduled_at) return scheduled_at;
    return proposed_times[0];
  };

  const getCallRequestTime = () => {
    if (!scheduled_at) return "TBC";
    const timestamp = getCallRequestTimestamp();
    return dayjs(timestamp).format("hh:mmA");
  };

  const getCallTimezone = () => {
    if (!scheduled_at) return "MULTIPLE TIMES PROPOSED";
    return currentUser?.timezone || "";
  };

  const renderActions = () => {
    let actions: JSX.Element[] = [];

    if (!currentUser) return actions;

    const onDeclineButtonClick = () => declineCallRef.current?.open();
    const onAcceptProposedTimesButtonClick = () =>
      acceptProposedTimesRef.current?.open();
    const onCheckProposedTimesButtonClick = () =>
      checkProposedTimesRef.current?.open();
    const onCancelButtonClick = () => cancellCallRef.current?.open();
    const onRescheduleButtonClick = () => rescheduleCallRef.current?.open();
    const onFinishButtonClick = () => markAsCompleteModalRef.current?.open();
    const onJoinCallButtonClick = () => history.push(`/call_requests/${id}`);

    actions = [
      [DECLINE_CALL_BUTTON, onDeclineButtonClick],
      [VIEW_CALL_PROPOSED_TIMES_BUTTON, onAcceptProposedTimesButtonClick],
      [CHECK_CALL_PROPOSED_TIMES_BUTTON, onCheckProposedTimesButtonClick],
      [CANCEL_CALL_BUTTON, onCancelButtonClick],
      [RESCHEDULE_CALL_BUTTON, onRescheduleButtonClick],
      [MARK_CALL_FINISHED_BUTTON, onFinishButtonClick],
      [JOIN_CALL_BUTTON, onJoinCallButtonClick],
    ].map((e) => {
      const [button, onClick] = e;
      // @ts-ignore
      return button.validate(callRequest, currentUser)
        ? // @ts-ignore
          button.render(onClick)
        : null;
    });

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
                text={`${
                  videoconference ? "Video Call" : "Phone Call "
                } with ${getCallPartnerNameBasedOnPerspective(
                  callRequest,
                  currentUser
                )}`}
                css={callNameTypographyStyles}
              />
              {[CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED].includes(status) ? (
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
              text={getCallTimezone()}
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
              text={`$${(total_cost_cents / 100).toFixed(2)}`}
              css={callBillingTypographStyles}
            />
            <Typography
              variant="bold"
              text="CALL PRICE"
              css={labelTypographStyles}
            />
          </PriceContainer>
          <ActionsContainer>
            {[CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED].includes(status) ? (
              <Typography
                variant="regular"
                text={`${duration_in_mins - minutes_used} min remaining`}
                css={minutesRemainingTypographStyles}
              />
            ) : null}
            {renderActions()}
          </ActionsContainer>
        </BillingContainer>
      </RightContainer>
      <Modal ref={markAsCompleteModalRef}>
        <MarkAsCompleteModal callRequest={callRequest} />
      </Modal>
      <Modal ref={rescheduleCallRef}>
        <RescheduleCallModal callRequest={callRequest} />
      </Modal>
      <Modal ref={acceptProposedTimesRef}>
        <ProposedTimesModal callRequest={callRequest} />
      </Modal>
      <Modal ref={checkProposedTimesRef}>
        <ProposedTimesModal callRequest={callRequest} readOnly />
      </Modal>
      <Modal ref={declineCallRef}>
        <DeclineCallModal callRequest={callRequest} />
      </Modal>
      <Modal ref={cancellCallRef}>
        <CancelCallModal callRequest={callRequest} />
      </Modal>
      <Modal ref={refundCallRef}>
        <RefundCallModal callRequest={callRequest} />
      </Modal>
    </StyledContainer>
  );
};

export default CallRequestListItem;
