import React, { useRef, useEffect, useState, useMemo } from "react";
import useAppContext from "../../../hooks/useAppContext";
import CallRequestListItem from "../../../components/CallRequestListItem";
import Typography from "../../../components/Typography";
import VerticalDivider from "../../../components/VerticalDivider";
import logo from "../../../assets/logo.png";
import ActionsMenu, {
  ActionsMenuInterface,
} from "../../../components/ActionsMenu";
import { observer } from "mobx-react-lite";
import {
  isExpertPerspective,
  isRequesterPerspective,
} from "../../../utils/callrequest";
import {
  NO_PENDING_CALLS,
  NO_SCHEDULED_CALLS,
  NO_COMPLETED_CALLS,
} from "../../../constants/messages";
import {
  CALL_REQUEST_COMPLETED,
  CALL_REQUEST_PENDING_EXPERT,
  CALL_REQUEST_PENDING_REQUESTER,
  CALL_REQUEST_LIVE,
  CALL_REQUEST_SCHEDULED,
  CALL_REQUEST_CANCELED,
  CALL_REQUEST_DECLINED,
} from "../../../constants/states";
import { CallRequestType } from "../../../types/models";
import { CallRequestListScreenPropsType } from "../../../types/screens/CallRequest";
import {
  StyledContainer,
  WelcomeContainer,
  TabsContainer,
  TabContainer,
  RightActionsMenuContainer,
  Logo,
  Avatar,
  emptyTabSectionTypographyStyles,
  welcomeMessageTypographyStyles,
  tabNameTypographyStyles,
  tabNameActiveTypographyStyles,
  tabSectionNameTypographyStyles,
  verticalDividerStyles,
  actionMenuStyles,
} from "./styles";

const CallRequestListScreen: React.FC<CallRequestListScreenPropsType> = () => {
  const [tab, setTab] = useState<string>("upcomming");
  const menuRef = useRef<ActionsMenuInterface>(null);
  const {
    authStore: { currentUser },
    callRequestStore,
  } = useAppContext();
  const { callRequests } = callRequestStore;

  const renderTabLabel = (id: string, name: string) => {
    return (
      <Typography
        variant="bold"
        text={name}
        css={
          tab === id ? tabNameActiveTypographyStyles : tabNameTypographyStyles
        }
        onClick={() => setTab(id)}
      />
    );
  };

  const renderTabSection = (
    label: string,
    callRequests: CallRequestType[] | undefined,
    emptyMessage?: string
  ) => {
    if (!callRequests) return [];

    let section = [
      <Typography
        key={label}
        variant="bold"
        text={label.toUpperCase()}
        css={tabSectionNameTypographyStyles}
      />,
    ];

    if (callRequests.length === 0 && emptyMessage) {
      section = [
        ...section,
        <Typography
          key={`empty${label}`}
          variant="medium"
          text={emptyMessage}
          css={emptyTabSectionTypographyStyles}
        />,
      ];
      return section;
    }

    section = [
      ...section,
      ...callRequests.map((e) => (
        <CallRequestListItem callRequest={e} key={e.id} />
      )),
    ];

    return section;
  };

  useEffect(() => {
    callRequestStore.fetchCallRequests();
  }, [callRequestStore]);

  const upcommingTab = useMemo(() => {
    if (!callRequests) return [];

    const live = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_LIVE
    );
    const scheduled = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_SCHEDULED
    );
    const pending = callRequests?.filter(
      (callRequest) =>
        callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
        isRequesterPerspective(callRequest, currentUser)
    );
    const awaiting = callRequests?.filter(
      (callRequest) =>
        (callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
          isRequesterPerspective(callRequest, currentUser)) ||
        (callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
          isExpertPerspective(callRequest, currentUser))
    );

    return [
      ...[
        awaiting.length > 0
          ? renderTabSection("PENDING YOUR CONFIRMATION", awaiting)
          : null,
      ],
      ...[live.length > 0 ? renderTabSection("LIVE", live) : null],
      ...renderTabSection("SCHEDULED", scheduled, NO_SCHEDULED_CALLS),
      ...renderTabSection("PENDING CONFIRMATION", pending, NO_PENDING_CALLS),
    ];
  }, [callRequests, currentUser]);

  const completedTab = useMemo(() => {
    const completed = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_COMPLETED
    );

    return [...renderTabSection("COMPLETED", completed, NO_COMPLETED_CALLS)];
  }, [callRequests]);

  const historyTab = useMemo(() => {
    const declined =
      callRequests?.filter(({ status }) => status === CALL_REQUEST_DECLINED) ||
      [];
    const canceled =
      callRequests?.filter(({ status }) => status === CALL_REQUEST_CANCELED) ||
      [];

    return [
      ...[declined.length > 0 ? renderTabSection("DECLINED", declined) : null],
      ...[canceled.length > 0 ? renderTabSection("CANCELED", canceled) : null],
    ];
  }, [callRequests]);

  return (
    <StyledContainer>
      <WelcomeContainer>
        <Logo src={logo} />
        <VerticalDivider css={verticalDividerStyles} />
        <Typography
          variant="bold"
          text={`Hello ${currentUser?.name}! Welcome to Sidetime`}
          css={welcomeMessageTypographyStyles}
        />
        <RightActionsMenuContainer>
          <Avatar
            src={currentUser?.avatar_url}
            onMouseEnter={() => menuRef.current?.open()}
            onMouseLeave={() => menuRef.current?.close()}
          />
          <ActionsMenu ref={menuRef} css={actionMenuStyles} />
        </RightActionsMenuContainer>
      </WelcomeContainer>
      <TabsContainer>
        {renderTabLabel("upcomming", "Upcomming Calls")}
        {renderTabLabel("completed", "Completed Calls")}
        {renderTabLabel("history", "Call History Log")}
        <button onClick={() => callRequestStore.fetchCallRequests() }>REFRESH</button>
      </TabsContainer>
      <TabContainer>
        {tab === "upcomming" ? upcommingTab : null}
        {tab === "completed" ? completedTab : null}
        {tab === "history" ? historyTab : null}
      </TabContainer>
    </StyledContainer>
  );
};

export default observer(CallRequestListScreen);
