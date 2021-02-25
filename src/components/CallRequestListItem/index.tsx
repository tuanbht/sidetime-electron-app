import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import Typography from "../Typography";
import VerticalDivider from "../VerticalDivider";
import HorizontalDivider from "../HorizontalDivider";
import CalendarIcon from "../CalendarIcon";
import CommentListItem from "../CommentListItem";
import Modal, { ModalInterface } from "../Modal";
import MarkAsCompleteModal from "./MarkAsCompleteModal";
import RescheduleCallModal from "./RescheduleCallModal";
import ProposedTimesModal from "./ProposedTimesModal";
import DeclineCallModal from "./DeclineCallModal";
import CancelCallModal from "./CancelCallModal";
import RefundCallModal from "./RefundCallModal";
import CommentsList from "../Comments/List";
import CommentsCreate from "../Comments/Create";
import useAppContext from "../../hooks/useAppContext";
import { useFormik } from "formik";
import { formatCallRequestMessageAsComment } from "../../utils/comments";
import { CallRequestListItemPropsType } from "../../types/components/CallRequestListItem";
import { useHistory } from "react-router-dom";
import { Video, Phone } from "react-feather";
import { getScheduledCallRequestMessage } from "../../utils/notifications";
import {
  CALL_REQUEST_CANCELED,
  CALL_REQUEST_COMPLETED,
  CALL_REQUEST_DECLINED,
  CALL_REQUEST_LIVE,
  CALL_REQUEST_PAUSED,
} from "../../constants/states";
import {
  DECLINE_CALL_BUTTON,
  VIEW_CALL_PROPOSED_TIMES_BUTTON,
  CHECK_CALL_PROPOSED_TIMES_BUTTON,
  CANCEL_CALL_BUTTON,
  RESCHEDULE_CALL_BUTTON,
  MARK_CALL_FINISHED_BUTTON,
  JOIN_CALL_BUTTON,
  SHOW_CALL_COMMENTS_BUTTON,
  HIDE_CALL_COMMENTS_BUTTON,
  ACCEPT_PROPOSED_TIME_BUTTON,
} from "./ActionButtons";
import {
  getCallPartnerNameBasedOnPerspective,
  getFormmatedCallRequestStatus,
  isCallRequestPending,
  isMultiProposedCallRequest,
} from "../../utils/callrequest";
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
  declinedCanceledLabelTypographyStyles,
  labelTypographStyles,
  messagesTypographyStyles,
} from "./styles";

const CallRequestListItem: React.FC<CallRequestListItemPropsType> = ({
  callRequest,
}) => {
  const markAsCompleteModalRef = useRef<ModalInterface>(null);
  const rescheduleCallRef = useRef<ModalInterface>(null);
  const acceptTimesRef = useRef<ModalInterface>(null);
  const checkTimesRef = useRef<ModalInterface>(null);
  const declineCallRef = useRef<ModalInterface>(null);
  const cancellCallRef = useRef<ModalInterface>(null);
  const refundCallRef = useRef<ModalInterface>(null);
  const [isShowingComments, toogleComments] = useState<boolean>(false);

  const history = useHistory();
  const {
    notificationStore,
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
    proposed_times,
    total_cost_cents,
    minutes_used,
    message,
    messaging_enabled,
  } = callRequest;

  const acceptTimeForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      acceptTimeForm.setSubmitting(true);
      callRequestStore
        .setCallRequestAsAccepted(callRequest, proposed_times[0])
        .then(() => {
          const message = getScheduledCallRequestMessage(
            callRequest,
            currentUser
          );
          notificationStore.setSuccessNotification(message);
        })
        .finally(() => acceptTimeForm.setSubmitting(false));
    },
  });

  const getCallRequestTimestamp = () => {
    if (scheduled_at) return scheduled_at;
    return proposed_times[0];
  };

  const getCallRequestTime = () => {
    if (
      isCallRequestPending(callRequest) &&
      isMultiProposedCallRequest(callRequest)
    )
      return "TBC";

    const timestamp = getCallRequestTimestamp();
    return dayjs(timestamp).format("hh:mmA");
  };

  const getCallTimezone = () => {
    if (!scheduled_at && proposed_times.length > 1)
      return "MULTIPLE TIMES PROPOSED";
    return currentUser?.timezone || "";
  };

  const renderActions = () => {
    let actions: JSX.Element[] = [];

    if (!currentUser) return actions;

    const onDeclineButtonClick = () => declineCallRef.current?.open();
    const onAcceptTimesButtonClick = () => acceptTimesRef.current?.open();
    const onCheckTimesButtonClick = () => checkTimesRef.current?.open();
    const onCancelButtonClick = () => cancellCallRef.current?.open();
    const onRescheduleButtonClick = () => rescheduleCallRef.current?.open();
    const onFinishButtonClick = () => markAsCompleteModalRef.current?.open();
    const onShowCommentsButtonClick = () => toogleComments(true);
    const onHideCommentsButtonClick = () => toogleComments(false);
    const onJoinCallButtonClick = () => history.push(`/call_requests/${id}`);
    const onAcceptTimeButtonClick = () => {
      acceptTimeForm.handleSubmit();
    };

    actions = [
      isShowingComments
        ? [HIDE_CALL_COMMENTS_BUTTON, onHideCommentsButtonClick]
        : null,
      !isShowingComments
        ? [SHOW_CALL_COMMENTS_BUTTON, onShowCommentsButtonClick]
        : null,
      [DECLINE_CALL_BUTTON, onDeclineButtonClick],
      [VIEW_CALL_PROPOSED_TIMES_BUTTON, onAcceptTimesButtonClick],
      [ACCEPT_PROPOSED_TIME_BUTTON, onAcceptTimeButtonClick],
      [CHECK_CALL_PROPOSED_TIMES_BUTTON, onCheckTimesButtonClick],
      [CANCEL_CALL_BUTTON, onCancelButtonClick],
      [RESCHEDULE_CALL_BUTTON, onRescheduleButtonClick],
      [MARK_CALL_FINISHED_BUTTON, onFinishButtonClick],
      [JOIN_CALL_BUTTON, onJoinCallButtonClick],
    ].map((action) => {
      if (!action) return null;
      const [button, onClick] = action;
      // @ts-ignore
      return button.validate(callRequest, currentUser)
        ? // @ts-ignore
          button.render(onClick, acceptTimeForm.isSubmitting)
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
              {[
                CALL_REQUEST_DECLINED,
                CALL_REQUEST_CANCELED,
                CALL_REQUEST_COMPLETED,
              ].includes(status) ? (
                <Typography
                  variant="bold"
                  text={getFormmatedCallRequestStatus(callRequest)}
                  css={declinedCanceledLabelTypographyStyles}
                />
              ) : null}
            </CallNameContainer>
            <Typography
              variant="semiBold"
              text={call_type}
              css={callTypeTypographStyles}
            />
            {!isShowingComments && (
              <CommentListItem
                side="left"
                callRequest={callRequest}
                comment={formatCallRequestMessageAsComment(message)}
              />
            )}
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
            <Typography
              variant="bold"
              text={dayjs(getCallRequestTimestamp()).format("MMM D, YYYY")}
              css={labelTypographStyles}
            />
          </TimeContainer>
        </InfoContainer>
        <HorizontalDivider />
        {isShowingComments && (
          <>
            <Typography
              variant="bold"
              text="MESSAGES"
              css={messagesTypographyStyles}
            />{" "}
            <CommentsList callRequest={callRequest}>
              <HorizontalDivider />
              {messaging_enabled && (
                <>
                  <CommentsCreate callRequest={callRequest} />
                  <HorizontalDivider />
                </>
              )}
            </CommentsList>
          </>
        )}
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
      <Modal ref={acceptTimesRef}>
        <ProposedTimesModal callRequest={callRequest} />
      </Modal>
      <Modal ref={checkTimesRef}>
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
