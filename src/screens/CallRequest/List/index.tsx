import React, { useRef, useEffect, useState, useMemo } from "react";
import useAppContext from "../../../hooks/useAppContext";
import CallRequestListItem from "../../../components/CallRequestListItem";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";
import VerticalDivider from "../../../components/VerticalDivider";
import logo from "../../../assets/logo.png";
import { RefreshCw } from "react-feather";
import { useFormik } from "formik";
import ActionsMenu, {
  ActionsMenuInterface,
} from "../../../components/ActionsMenu";
import { observer } from "mobx-react-lite";
import {
  NO_PENDING_CALLS,
  NO_SCHEDULED_CALLS,
} from "../../../constants/messages";
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
  currentSiteTypographyStyles,
  LeftWelcomeContainer,
} from "./styles";

const CallRequestListScreen: React.FC<CallRequestListScreenPropsType> = () => {
  const [tab, setTab] = useState<string>("upcoming");
  const menuRef = useRef<ActionsMenuInterface>(null);
  const {
    authStore: { currentUser },
    callRequestStore,
    siteStore: { currentSite }
  } = useAppContext();
  const { upcomingCallRequests, pastCallRequests } = callRequestStore;
  const refreshButtonForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      refreshButtonForm.setSubmitting(true);

      const fetchingCallsPromise = tab === 'upcoming' ? callRequestStore.fetchCurrentCallRequests() :
        callRequestStore.fetchPastCallRequests();
      fetchingCallsPromise.finally(() => refreshButtonForm.setSubmitting(false));
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
    callRequestStore.fetchCurrentCallRequests();
  }, [callRequestStore]);

  useEffect(() => {
    callRequestStore.fetchPastCallRequests();
  }, [callRequestStore, currentSite]);

  const upcommingTab = useMemo(() => {
    if (!upcomingCallRequests) return [];

    const { requiresResponse, pending, scheduled, completed } = upcomingCallRequests.data

    return [
      ...[
        requiresResponse
          ? renderTabSection("PENDING YOUR CONFIRMATION", requiresResponse)
          : null,
      ],
      ...renderTabSection("SCHEDULED", scheduled, NO_SCHEDULED_CALLS),
      ...renderTabSection("PENDING CONFIRMATION", pending, NO_PENDING_CALLS),
      ...[
        completed
          ? renderTabSection("COMPLETED", completed)
          : null,
      ],
    ];
  }, [upcomingCallRequests]);

  const historyTab = useMemo(() => {
    return (pastCallRequests || []).map((callRequest) => <CallRequestListItem callRequest={callRequest} key={callRequest.id} />);
  }, [pastCallRequests]);

  // TODO: Integrate completed calls
  return (
    <StyledContainer>
      <WelcomeContainer>
        <LeftWelcomeContainer>
          <Logo src={logo} />
          <VerticalDivider css={verticalDividerStyles} />
          <div>
            <div>
              <Typography
                variant="bold"
                text={`Hello ${currentUser?.name}! Welcome to Sidetime`}
                css={welcomeMessageTypographyStyles}
                />
            </div>
            {currentSite && <div>
              <Typography
                variant="semiBold"
                text={`You are at ${currentSite?.name}`}
                css={currentSiteTypographyStyles}
              />
            </div>}
          </div>
        </LeftWelcomeContainer>
        <RightActionsMenuContainer>
          <Avatar
            src={currentUser?.avatarUrl}
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
        {/* {tab === "completed" ? completedTab : null} */}
        {tab === "history" ? historyTab : null}
      </TabContainer>
    </StyledContainer>
  );
};

export default observer(CallRequestListScreen);
