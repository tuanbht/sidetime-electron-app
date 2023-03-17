import React, { useMemo, useRef, useState } from "react";
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
import CommentsList from "../Comments/List";
import CommentsCreate from "../Comments/Create";
import useAppContext from "../../hooks/useAppContext";
import { useFormik } from "formik";
import { formatCallRequestMessageAsComment } from "../../utils/comments";
import { CallRequestListItemPropsType } from "../../types/components/CallRequestListItem";
import { useHistory } from "react-router-dom";
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
  getCallCommunicationMethod,
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
import { CallRequestType } from "../../types/models";
import { CallRequestItemContextProvider } from "../../contexts/CallRequestItemContext";
import RefundCallModal from "./RefundCallModal";

const CallRequestListItem: React.FC<CallRequestListItemPropsType> = ({
  callRequest: initCallRequest,
}) => {
  const markAsCompleteModalRef = useRef<ModalInterface>(null);
  const rescheduleCallRef = useRef<ModalInterface>(null);
  const acceptTimesRef = useRef<ModalInterface>(null);
  const checkTimesRef = useRef<ModalInterface>(null);
  const declineCallRef = useRef<ModalInterface>(null);
  const cancellCallRef = useRef<ModalInterface>(null);
  const refundCallRef = useRef<ModalInterface>(null);

  const [callRequest, setCallRequest] = useState<CallRequestType>(initCallRequest);
  const [isShowingComments, toggleComments] = useState<boolean>(false);

  const history = useHistory();
  const {
    notificationStore,
    callRequestStore,
    authStore: { currentUser, timezone },
  } = useAppContext();

  const acceptTimeForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      acceptTimeForm.setSubmitting(true);
      callRequestStore
        .setCallRequestAsAccepted(callRequest, proposedTimes[0])
        .then((response) => {
          const message = getScheduledCallRequestMessage(
            response,
            currentUser
          );
          setCallRequest(response);
          notificationStore.setSuccessNotification(message);
        })
        .finally(() => acceptTimeForm.setSubmitting(false));
    },
  });

  const {
    status,
    callTypeName,
    scheduledAt,
    durationInMins,
    proposedTimes,
    totalCost,
    minutesUsed,
    message,
    messagingEnabled,
  } = callRequest;

  const { icon: CommunicationIcon, callMethodName } = getCallCommunicationMethod(callRequest);

  const timestamp = useMemo(() => {
    const timestamp =  scheduledAt || proposedTimes[0];
    return dayjs(timestamp).tz(timezone);
  }, [proposedTimes, scheduledAt, timezone])

  const getCallRequestTime = () => {
    if (
      isCallRequestPending(callRequest) &&
      isMultiProposedCallRequest(callRequest)
    )
      return "TBC";
    return timestamp.format("hh:mmA");
  };

  const getCallTimezone = () => {
    if (!scheduledAt && proposedTimes.length > 1)
      return "MULTIPLE TIMES PROPOSED";
    return timestamp.format('z');
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
    const onShowCommentsButtonClick = () => toggleComments(true);
    const onHideCommentsButtonClick = () => toggleComments(false);
    const onJoinCallButtonClick = () => history.push(`/${callRequest.siteSlug}/call_requests/${callRequest.slug}`);
    const onAcceptTimeButtonClick = () => {
      acceptTimeForm.handleSubmit();
    };
    // FIXME: Add refund button validation and rendering

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
      <CallRequestItemContextProvider callRequest={callRequest} updateCallRequest={setCallRequest}>
        <LeftContainer>
          <CalendarIcon timestamp={timestamp.toString()} />
        </LeftContainer>
        <RightContainer>
          <InfoContainer>
            <ExpertContainer>
              <CallNameContainer>
                <CommunicationIcon size={24} style={callIconStyles} />
                <Typography
                  variant="medium"
                  text={`${callMethodName} with ${getCallPartnerNameBasedOnPerspective(
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
                text={callTypeName}
                css={callTypeTypographStyles}
              />
              {!isShowingComments && (
                <CommentListItem
                  side="left"
                  comment={formatCallRequestMessageAsComment({ message, userId: callRequest.requesterId, createdAt: callRequest.createdAt})}
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
                text={timestamp.format("MMM D, YYYY")}
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
              <CommentsList >
                <HorizontalDivider />
                {messagingEnabled && (
                  <>
                    <CommentsCreate />
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
                text={`${durationInMins}min`}
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
                text={`$${totalCost}`}
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
                  text={`${durationInMins - minutesUsed} min remaining`}
                  css={minutesRemainingTypographStyles}
                />
              ) : null}
              {renderActions()}
            </ActionsContainer>
          </BillingContainer>
        </RightContainer>
        <Modal ref={markAsCompleteModalRef}>
          <MarkAsCompleteModal />
        </Modal>
        <Modal ref={rescheduleCallRef}>
          <RescheduleCallModal />
        </Modal>
        <Modal ref={acceptTimesRef}>
          <ProposedTimesModal />
        </Modal>
        <Modal ref={checkTimesRef}>
          <ProposedTimesModal readOnly />
        </Modal>
        <Modal ref={declineCallRef}>
          <DeclineCallModal />
        </Modal>
        <Modal ref={cancellCallRef}>
          <CancelCallModal />
        </Modal>
        <Modal ref={refundCallRef}>
          <RefundCallModal />
        </Modal>
      </CallRequestItemContextProvider>
    </StyledContainer>
  );
};

export default CallRequestListItem;
