import React from "react";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import useAppContext from "../../../hooks/useAppContext";
import { X } from "react-feather";
import { useFormik } from "formik";
import { schema, schemaValues } from "./form";
import {
  StyledContainer,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  ProposedTimeContainer,
  goBackButtonStyles,
  commentInputStyles,
  submitProposalButtonStyles,
  modalHeaderTypographyStyles,
  bodyTextTypographyStyles,
  proposedTimeTypographyStyles,
  removeProposedTimeTypographyStyles,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
} from "./styles";
import useModalContext from "../../../hooks/useModalContext";
import Input from "../../Input";
import TimerPicker from "../../TimePicker";
import dayjs from "dayjs";
import {
  getCallPartnerNameBasedOnPerspective,
} from "../../../utils/callrequest";
import useCallRequestItemContext from "../../../hooks/useCallRequestItemContext";

const RescheduleCallModal: React.FC = () => {
  const {
    callRequestStore: { bounceCallRequest },
    notificationStore,
    authStore: { currentUser, timezone },
  } = useAppContext();
  const modalContext = useModalContext();
  const { callRequest, updateCallRequest } = useCallRequestItemContext();

  const form = useFormik({
    enableReinitialize: false,
    validateOnMount: true,
    initialValues: schemaValues,
    validationSchema: schema,
    onSubmit: (values) => {
      form.setSubmitting(true);

      bounceCallRequest(callRequest, {
        ...values,
        replyUserId: currentUser?.id,
      })
        .then((response) => {
          updateCallRequest(response);
          notificationStore.setSuccessNotification(
            "Call rescheduling request sent."
          );
          modalContext.close();
        })
        .finally(() => {
          form.setSubmitting(false);
        });
    },
  });

  const onNewTimeAdded = (time: string) => {
    form.setFieldValue("proposedTimes", [...form.values.proposedTimes, time]);
  };

  const onTimeRemoved = (index: number) => {
    form.setFieldValue(
      "proposedTimes",
      form.values.proposedTimes.filter((_, i) => index !== i)
    );
  };

  const renderProposedTimes = () => {
    return (
      <>
        <Typography
          variant="bold"
          text="Proposed time(s):"
          css={bodyTextTypographyStyles}
        />
        {form.values.proposedTimes.map((e, index) => {
          return (
            <div key={index}>
              <ProposedTimeContainer>
                <Typography
                  variant="regular"
                  text={dayjs(e).tz(timezone).format("dddd MMM DD YYYY hh:mm A")}
                  css={proposedTimeTypographyStyles}
                />
                <Typography
                  variant="regular"
                  text="Remove"
                  css={removeProposedTimeTypographyStyles}
                  onClick={() => onTimeRemoved(index)}
                />
              </ProposedTimeContainer>
              <HorizontalDivider />
            </div>
          );
        })}
      </>
    );
  };

  const renderBottomTimePicker = () => {
    const { length } = form.values.proposedTimes;
    if (length === 0 || length >= 5) return null;

    return <TimerPicker onAddTime={onNewTimeAdded} />;
  };

  const renderCallPartnerName = () => {
    if (!currentUser) return "";
    return getCallPartnerNameBasedOnPerspective(callRequest, currentUser);
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="medium"
          text="Propose new times"
          css={modalHeaderTypographyStyles}
        />
        <Button
          icon={<X style={closeButtonIconStyles} />}
          onClick={() => modalContext.close()}
          css={closeButtonStyles}
        />
      </ModalHeaderContainer>
      <HorizontalDivider />
      <ModalBodyContainer>
        <Typography
          variant="regular"
          text={`Propose up to five times that suit you and let ${renderCallPartnerName()} confirm one.`}
          css={bodyTextTypographyStyles}
        />
        {form.values.proposedTimes.length ? (
          renderProposedTimes()
        ) : (
          <TimerPicker onAddTime={onNewTimeAdded} />
        )}
        <Input
          type="text-area"
          placeholder="Optional comment"
          value={form.values.reply || ""}
          numRows={4}
          onChange={(value) => form.setFieldValue("reply", value)}
          css={commentInputStyles}
        />
        {renderBottomTimePicker()}
      </ModalBodyContainer>
      <ModalFooterContainer>
        <Button
          text="GO BACK"
          onClick={() => modalContext.close()}
          buttonTextCss={goBackButtonTextStyles}
          css={goBackButtonStyles}
        />
        <Button
          disabled={!form.isValid || form.isSubmitting}
          isLoading={form.isSubmitting}
          text="SUBMIT THE PROPOSAL"
          onClick={form.handleSubmit}
          css={submitProposalButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default RescheduleCallModal;
