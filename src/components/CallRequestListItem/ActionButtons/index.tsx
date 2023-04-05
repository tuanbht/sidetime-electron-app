import Button from "../../Button";
import {
  PhoneCall,
  MessageCircle,
  Check,
  XOctagon,
  Calendar,
} from "react-feather";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as Refund } from "../../../assets/refund.svg";
import { CallRequestType, UserType } from "../../../types/models";
import {
  isCallFromBundle,
  isExpertMissedCall,
  isExpertPerspective,
  isRequesterPerspective,
  isValidProposedTime,
} from "../../../utils/callrequest";
import {
  CALL_REQUEST_PENDING_EXPERT,
  CALL_REQUEST_PENDING_REQUESTER,
  CALL_REQUEST_SCHEDULED,
  CALL_REQUEST_FINISHABLE,
  CALL_REQUEST_IN_PROGRESS,
  CALL_REQUEST_PENDING,
} from "../../../constants/states";
import {
  actionIconStyles,
  actionButtonStyles,
  greenButtonIconStyles,
  deleteButtonStyles,
  declineButtonStyles,
  deleteIconStyles,
  declineIconStyles,
  proposedTimesButtonStyles,
  declineButtonTextStyles,
  greenButtonStyles,
} from "./styles";

export const DECLINE_CALL_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<XOctagon size={16} style={declineIconStyles} />}
      text="DECLINE"
      onClick={onClick}
      css={declineButtonStyles}
      buttonTextCss={declineButtonTextStyles}
    />
  ),
  validate: (callRequest: CallRequestType, currentUser: UserType) =>
    (isExpertPerspective(callRequest, currentUser) &&
      !isCallFromBundle(callRequest) &&
      CALL_REQUEST_PENDING.includes(callRequest.status)),
};

export const VIEW_CALL_PROPOSED_TIMES_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      text="VIEW PROPOSED TIMES"
      onClick={onClick}
      css={proposedTimesButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, currentUser: UserType) =>
    callRequest.proposedTimes.length > 1 &&
    ((callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
      isRequesterPerspective(callRequest, currentUser)) ||
      (callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
        isExpertPerspective(callRequest, currentUser))),
};

export const ACCEPT_PROPOSED_TIME_BUTTON = {
  render: (onClick: () => void, isLoading: boolean) => (
    <Button
      isLoading={isLoading}
      disabled={isLoading}
      key={uuidv4()}
      icon={<Check size={16} style={greenButtonIconStyles} />}
      text={"ACCEPT"}
      onClick={onClick}
      css={greenButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, currentUser: UserType) =>
    callRequest.proposedTimes.length === 1 && isValidProposedTime(callRequest.proposedTimes[0]) &&
    ((callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
      isRequesterPerspective(callRequest, currentUser)) ||
      (callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
        isExpertPerspective(callRequest, currentUser))),
};

export const CHECK_CALL_PROPOSED_TIMES_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      text="PROPOSED TIMES"
      onClick={onClick}
      css={proposedTimesButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, currentUser: UserType) =>
    (callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
      isExpertPerspective(callRequest, currentUser)) ||
    (callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
      isRequesterPerspective(callRequest, currentUser)),
};

export const CANCEL_CALL_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<XOctagon size={16} style={deleteIconStyles} />}
      onClick={onClick}
      css={deleteButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, _: UserType) =>
    !isCallFromBundle(callRequest) &&
      (
        [...CALL_REQUEST_PENDING, CALL_REQUEST_SCHEDULED].includes(callRequest.status) ||
        isExpertMissedCall(callRequest)
      ),
};

export const RESCHEDULE_CALL_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<Calendar size={16} style={actionIconStyles} />}
      onClick={onClick}
      css={actionButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, currentUser: UserType) =>
    (isRequesterPerspective(callRequest, currentUser) &&
      callRequest.status === CALL_REQUEST_PENDING_REQUESTER) ||
    (isExpertPerspective(callRequest, currentUser) &&
      (
        [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_SCHEDULED].includes(callRequest.status) ||
        isExpertMissedCall(callRequest)
      )
    ),
};

export const MARK_CALL_FINISHED_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<Check size={16} style={actionIconStyles} />}
      onClick={onClick}
      css={actionButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, _currentUser: UserType) =>
    CALL_REQUEST_FINISHABLE.includes(callRequest.status)
};

export const JOIN_CALL_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<PhoneCall size={16} style={greenButtonIconStyles} />}
      text={"JOIN CALL"}
      onClick={onClick}
      css={greenButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, _currentUser: UserType) =>
    CALL_REQUEST_IN_PROGRESS.includes(callRequest.status) &&
      callRequest.callVia === 'system' &&
      callRequest.communicateVia === 'videoconference',
};

export const SHOW_CALL_COMMENTS_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<MessageCircle size={16} style={actionIconStyles} />}
      onClick={onClick}
      css={actionButtonStyles}
    />
  ),
  validate: (_callRequest: CallRequestType, _currentUser: UserType) => true,
};

export const HIDE_CALL_COMMENTS_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<MessageCircle size={16} style={actionIconStyles} />}
      onClick={onClick}
      css={actionButtonStyles}
    />
  ),
  validate: (_callRequest: CallRequestType, _currentUser: UserType) => true,
};

export const REFUND_CALL_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<Refund style={actionIconStyles} />}
      onClick={onClick}
      css={actionButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, currentUser: UserType) =>
    callRequest.refundable &&
    isExpertPerspective(callRequest, currentUser),
};

export const ACTION_BUTTONS = {
  DECLINE_CALL_BUTTON,
  VIEW_CALL_PROPOSED_TIMES_BUTTON,
  CHECK_CALL_PROPOSED_TIMES_BUTTON,
  CANCEL_CALL_BUTTON,
  RESCHEDULE_CALL_BUTTON,
  MARK_CALL_FINISHED_BUTTON,
  JOIN_CALL_BUTTON,
  SHOW_CALL_COMMENTS_BUTTON,
  HIDE_CALL_COMMENTS_BUTTON,
  REFUND_CALL_BUTTON,
};
