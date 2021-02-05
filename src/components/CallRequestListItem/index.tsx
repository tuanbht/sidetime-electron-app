import React, { useRef } from "react";
import dayjs from "dayjs";
import Button from "../Button";
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
// eslint-disable-next-line
import { ReactComponent as Refund } from "../../assets/refund.svg";
import { CallRequestListItemPropsType } from "../../types/components/CallRequestListItem";
import { useHistory } from "react-router-dom";
import {
  Video,
  Phone,
  PhoneCall,
  // eslint-disable-next-line
  MessageCircle,
  Check,
  XOctagon,
  Calendar,
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
import {
  getCallPartnerNameBasedOnPerspective,
  isExpertPerspective,
  isRequesterPerspective,
} from "../../utils/callrequest";

const CallRequestListItem: React.FC<CallRequestListItemPropsType> = ({
  callRequest,
}) => {
  const markAsCompleteModalRef = useRef<ModalInterface>(null);
  const rescheduleCallRef = useRef<ModalInterface>(null);
  const proposedTimesRef = useRef<ModalInterface>(null);
  const declineCallRef = useRef<ModalInterface>(null);
  const cancellCallRef = useRef<ModalInterface>(null);
  const refundCallRef = useRef<ModalInterface>(null);
  const history = useHistory();
  const {
    callRequestStore,
    authStore: { currentUser },
  } = useAppContext();
  const {
    id,
    videoconference,
    status,
    call_type,
    scheduled_at,
    duration_in_mins,
    price_cents,
    proposed_times,
    minutes_used
  } = callRequest;

  const onJoinCallButtonClicked = () => {
    callRequestStore.setCallRequest(callRequest);
    history.push(`/call_requests/${id}`);
  };

  const getCallRequestTimestamp = () => {
    if(scheduled_at) return scheduled_at;
    return proposed_times[0];
  };

  const getCallRequestTime = () => {
    const timestamp = getCallRequestTimestamp();
    return dayjs(timestamp).format("hh:mmA");
  };

  const renderActions = () => {
    let actions: any = [];

    // Hiding comments button
    // actions.push(
    //   <Button
    //     key={`messages-${id}`}
    //     icon={<MessageCircle size={16} style={actionIconStyles} />}
    //     onClick={() => {}}
    //     css={actionButtonStyles}
    //   />
    // );

    if (
      [CALL_REQUEST_PENDING_REQUESTER].includes(status) ||
      (status === CALL_REQUEST_PENDING_EXPERT &&
        isExpertPerspective(callRequest, currentUser))
    ) {
      actions = actions.concat(
        <Button
          key={`decline-${id}`}
          icon={<XOctagon size={16} style={declineIconStyles} />}
          text="DECLINE"
          onClick={() => declineCallRef.current?.open()}
          css={declineButtonStyles}
          buttonTextCss={declineButtonTextStyles}
        />,
        <Button
          key={`proposed-times-${id}`}
          text="VIEW PROPOSED TIMES"
          onClick={() => proposedTimesRef.current?.open()}
          css={proposedTimesButtonStyles}
        />
      );
    }

    if ([CALL_REQUEST_SCHEDULED].includes(status)) {
      actions = actions.concat(
        <Button
          key={`delete-${id}`}
          icon={<XOctagon size={16} style={deleteIconStyles} />}
          onClick={() => cancellCallRef.current?.open()}
          css={deleteButtonStyles}
        />
      );
    }

    if (
      [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_SCHEDULED].includes(status) &&
      isRequesterPerspective(callRequest, currentUser)
    ) {
      actions = actions.concat(
        <Button
          key={`reschedule-${id}`}
          icon={<Calendar size={16} style={actionIconStyles} />}
          onClick={() => rescheduleCallRef.current?.open()}
          css={actionButtonStyles}
        />
      );
    }

    //  Hiding refund button
    // if (
    //   [CALL_REQUEST_LIVE].includes(status) &&
    //   isExpertPerspective(callRequest, currentUser)
    // ) {
    //   actions = actions.concat(
    //     <Button
    //       key={`refund-${id}`}
    //       icon={<Refund style={actionIconStyles} />}
    //       onClick={() => refundCallRef.current?.open()}
    //       css={actionButtonStyles}
    //     />
    //   );
    // }

    if ([CALL_REQUEST_LIVE].includes(status)) {
      actions = actions.concat(
        <Button
          key={`done-${id}`}
          icon={<Check size={16} style={actionIconStyles} />}
          onClick={() => markAsCompleteModalRef.current?.open()}
          css={actionButtonStyles}
        />,
        <Button
          key={`join-${id}`}
          icon={<PhoneCall size={16} style={joinCallIconStyles} />}
          text={"JOIN CALL"}
          onClick={onJoinCallButtonClicked}
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
                text={`${
                  videoconference ? "Video Call" : "Phone Call "
                } with ${getCallPartnerNameBasedOnPerspective(
                  callRequest,
                  currentUser
                )}`}
                css={callNameTypographyStyles}
              />
              {status === CALL_REQUEST_LIVE ? (
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
          <PriceContainer>
            <Typography
              variant="bold"
              text={`${minutes_used}`}
              css={callBillingTypographStyles}
            />
            <Typography
              variant="bold"
              text="MINUTES USED"
              css={labelTypographStyles}
            />
          </PriceContainer>          
          <ActionsContainer>{renderActions()}</ActionsContainer>
        </BillingContainer>
      </RightContainer>
      <Modal ref={markAsCompleteModalRef}>
        <MarkAsCompleteModal callRequest={callRequest} />
      </Modal>
      <Modal ref={rescheduleCallRef}>
        <RescheduleCallModal callRequest={callRequest} />
      </Modal>
      <Modal ref={proposedTimesRef}>
        <ProposedTimesModal callRequest={callRequest} />
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
