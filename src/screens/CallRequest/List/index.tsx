import React, { useRef, useEffect, useState, useMemo } from "react";
import useAppContext from "../../../hooks/useAppContext";
import CallRequestListItem from "../../../components/CallRequestListItem";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";
import VerticalDivider from "../../../components/VerticalDivider";
import logo from "../../../assets/logo.png";
import { RefreshCw } from "react-feather";
import { useFormik } from "formik";
import { Timer } from "../../../utils/timer";
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
  CALL_REQUEST_PAUSED,
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
  refreshButtonStyles,
  refreshIconStyles,
} from "./styles";

const CallRequestListScreen: React.FC<CallRequestListScreenPropsType> = () => {
  const [tab, setTab] = useState<string>("upcoming");
  const menuRef = useRef<ActionsMenuInterface>(null);
  const {
    authStore: { currentUser },
    callRequestStore,
  } = useAppContext();
  const { callRequests } = callRequestStore;
  const refreshButtonForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      refreshButtonForm.setSubmitting(true);
      callRequestStore
        .fetchCallRequests()
        .finally(() => refreshButtonForm.setSubmitting(false));
    },
  });

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
    const timer = new Timer(() => callRequestStore.fetchCallRequests(), {
      minutes: 5,
      repeat: true,
    });

    return () => timer.clear();
  }, [callRequestStore]);

  useEffect(() => {
    callRequestStore.fetchCallRequests();
  }, [callRequestStore]);

  const upcommingTab = useMemo(() => {
    if (!callRequests) return [];

    const live = callRequests?.filter(
      ({ status }) =>
        status === CALL_REQUEST_LIVE || status === CALL_REQUEST_PAUSED
    );
    const scheduled = callRequests?.filter(
      ({ status }) => status === CALL_REQUEST_SCHEDULED
    );
    const pending = callRequests?.filter(
      (callRequest) =>
        (callRequest.status === CALL_REQUEST_PENDING_EXPERT &&
          isRequesterPerspective(callRequest, currentUser)) ||
        (callRequest.status === CALL_REQUEST_PENDING_REQUESTER &&
          isExpertPerspective(callRequest, currentUser))
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
    const completed = callRequests
      ?.filter(({ status }) => status === CALL_REQUEST_COMPLETED)
      .sort(
        (e, i) =>
          new Date(e.scheduled_at).getTime() -
          new Date(i.scheduled_at).getTime()
      )
      .reverse();

    return [...renderTabSection("COMPLETED", completed, NO_COMPLETED_CALLS)];
  }, [callRequests]);

  const historyTab = useMemo(() => {
    const calls = (
      callRequests?.filter(({ status }) =>
        [
          CALL_REQUEST_DECLINED,
          CALL_REQUEST_CANCELED,
          CALL_REQUEST_COMPLETED,
        ].includes(status)
      ) || []
    )
      .sort(
        (e, i) =>
          new Date(e.scheduled_at || e.proposed_times[0]).getTime() -
          new Date(i.scheduled_at || i.proposed_times[0]).getTime()
      )
      .reverse();

    return calls.map((e) => <CallRequestListItem callRequest={e} key={e.id} />);
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
        {renderTabLabel("upcoming", "Upcoming Calls")}
        {/* {renderTabLabel("completed", "Completed Calls")} */}
        {renderTabLabel("history", "Call History Log")}
        <Button
          css={refreshButtonStyles}
          icon={<RefreshCw size={16} style={refreshIconStyles} />}
          isLoading={refreshButtonForm.isSubmitting}
          disabled={refreshButtonForm.isSubmitting}
          onClick={refreshButtonForm.handleSubmit}
        />
      </TabsContainer>
      <TabContainer>
        {tab === "upcoming" ? upcommingTab : null}
        {tab === "completed" ? completedTab : null}
        {tab === "history" ? historyTab : null}
      </TabContainer>
    </StyledContainer>
  );
};

export default observer(CallRequestListScreen);
