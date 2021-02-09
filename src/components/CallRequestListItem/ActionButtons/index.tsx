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
  isExpertPerspective,
  isRequesterPerspective,
} from "../../../utils/callrequest";
import {
  CALL_REQUEST_LIVE,
  CALL_REQUEST_PENDING_EXPERT,
  CALL_REQUEST_PENDING_REQUESTER,
  CALL_REQUEST_SCHEDULED,
} from "../../../constants/states";
import {
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
    (callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
      isRequesterPerspective(callRequest, currentUser)) ||
    (isExpertPerspective(callRequest, currentUser) &&
      callRequest.status === CALL_REQUEST_PENDING_EXPERT),
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
    (callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
      isRequesterPerspective(callRequest, currentUser)) ||
    (callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
      isExpertPerspective(callRequest, currentUser)),
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
    callRequest.status === CALL_REQUEST_SCHEDULED,
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
      callRequest.status === CALL_REQUEST_PENDING_EXPERT) ||
    (isExpertPerspective(callRequest, currentUser) &&
      callRequest.status === CALL_REQUEST_SCHEDULED),
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
    callRequest.status === CALL_REQUEST_LIVE,
};

export const JOIN_CALL_BUTTON = {
  render: (onClick: () => void) => (
    <Button
      key={uuidv4()}
      icon={<PhoneCall size={16} style={joinCallIconStyles} />}
      text={"JOIN CALL"}
      onClick={onClick}
      css={joinCallButtonStyles}
    />
  ),
  validate: (callRequest: CallRequestType, _currentUser: UserType) =>
    callRequest.status === CALL_REQUEST_LIVE && callRequest.videoconference,
};

export const COMMENTS_CALL_BUTTON = {
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
    callRequest.status === CALL_REQUEST_LIVE &&
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
  COMMENTS_CALL_BUTTON,
  REFUND_CALL_BUTTON,
};
