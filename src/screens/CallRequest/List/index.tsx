import React, { useRef, useEffect, useState, useMemo } from "react";
import useAppContext from "../../../hooks/useAppContext";
import logo from "../../../assets/logo.png";
import { observer } from "mobx-react-lite";
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
import ActionsMenu, {
  ActionsMenuInterface,
} from "../../../components/ActionsMenu";
import CallRequestListItem from "../../../components/CallRequestListItem";
import Typography from "../../../components/Typography";
import VerticalDivider from "../../../components/VerticalDivider";

const CallRequestListScreen: React.FC<CallRequestListScreenPropsType> = () => {
  const [tab, setTab] = useState<string>("upcomming");
  const menuRef = useRef<ActionsMenuInterface>(null);
  const { authStore, callRequestStore } = useAppContext();
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
    const pendingExpert = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_PENDING_EXPERT
    );
    const pendingRequester = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_PENDING_REQUESTER
    );

    return [
      ...[
        pendingRequester.length > 0
          ? renderTabSection("PENDING YOUR CONFIRMATION", pendingRequester)
          : null,
      ],
      ...[live.length > 0 ? renderTabSection("LIVE", live) : null],
      ...renderTabSection("SCHEDULED", scheduled, NO_SCHEDULED_CALLS),
      ...renderTabSection(
        "PENDING CONFIRMATION",
        pendingExpert,
        NO_PENDING_CALLS
      ),
    ];
  }, [callRequests]);

  const completedTab = useMemo(() => {
    const completed = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_COMPLETED
    );

    return [...renderTabSection("COMPLETED", completed, NO_COMPLETED_CALLS)];
  }, [callRequests]);

  return (
    <StyledContainer>
      <WelcomeContainer>
        <Logo src={logo} />
        <VerticalDivider css={verticalDividerStyles} />
        <Typography
          variant="bold"
          text={`Hello ${authStore.currentUser?.name}! Welcome to Sidetime`}
          css={welcomeMessageTypographyStyles}
        />
        <RightActionsMenuContainer>
          <Avatar
            src={authStore.currentUser?.avatar_url}
            onMouseEnter={() => menuRef.current?.open()}
            onMouseLeave={() => menuRef.current?.close()}
          />
          <ActionsMenu ref={menuRef} css={actionMenuStyles} />
        </RightActionsMenuContainer>
      </WelcomeContainer>
      <TabsContainer>
        {renderTabLabel("upcomming", "Upcomming calls")}
        {renderTabLabel("completed", "Completed calls")}
      </TabsContainer>
      <TabContainer>
        {tab === "upcomming" ? upcommingTab : null}
        {tab === "completed" ? completedTab : null}
      </TabContainer>
    </StyledContainer>
  );
};

export default observer(CallRequestListScreen);
