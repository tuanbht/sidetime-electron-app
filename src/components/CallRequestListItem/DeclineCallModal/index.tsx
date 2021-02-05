import React from "react";
import dayjs from "dayjs";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import Input from "../../Input";
import TimerPicker from "../../TimePicker";
import useAppContext from "../../../hooks/useAppContext";
import useModalContext from "../../../hooks/useModalContext";
import { X } from "react-feather";
import { useFormik } from "formik";
import { schema, schemaValues } from "./form";
import { DeclineCallModalPropsType } from "../../../types/components/CallRequestListItem";
import {
  StyledContainer,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  ProposedTimeContainer,
  goBackButtonStyles,
  commentInputStyles,
  acceptButtonStyles,
  declineButtonStyles,
  modalHeaderTypographyStyles,
  bodyTextTypographyStyles,
  proposedTimeTypographyStyles,
  removeProposedTimeTypographyStyles,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
} from "./styles";

const DeclineCallModal: React.FC<DeclineCallModalPropsType> = ({
  callRequest,
}) => {
  const { callRequestStore, notificationStore, authStore } = useAppContext();
  const modalContext = useModalContext();
  const declineForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      declineForm.setSubmitting(true);
      callRequestStore
        .setCallRequestAsDeclined(callRequest)
        .then(() => {
          modalContext.close();
          notificationStore.setSuccessNotification("Call marked as declined");
        })
        .finally(() => {
          declineForm.setSubmitting(false);
        });
    },
  });

  const form = useFormik({
    enableReinitialize: false,
    initialValues: schemaValues,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      callRequestStore
        .bounceCallRequest(callRequest, {
          ...values,
          reply_user_id: authStore.currentUser?.id || "",
        })
        .then(() => {
          notificationStore.setSuccessNotification(
            "Proposal with new time successfully sent"
          );
          modalContext.close();
        })
        .finally(() => {
          form.setSubmitting(false);
        });
    },
  });

  const onNewTimeAdded = (time: string) => {
    form.setFieldValue("proposed_times", [...form.values.proposed_times, time]);
  };

  const onTimeRemoved = (index: number) => {
    form.setFieldValue(
      "proposed_times",
      form.values.proposed_times.filter((_, i) => index !== i)
    );
  };

  const renderProposedTimes = () => {
    if (form.values.proposed_times.length === 0) return null;
    return (
      <>
        <Typography
          variant="bold"
          text="Proposed time(s):"
          css={bodyTextTypographyStyles}
        />
        {form.values.proposed_times.map((e, index) => {
          return (
            <>
              <ProposedTimeContainer>
                <Typography
                  variant="regular"
                  text={dayjs(e).format("dddd MMM DD YYYY hh:mm A")}
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
            </>
          );
        })}
      </>
    );
  };

  const renderTimePicker = () => {
    const { length } = form.values.proposed_times;
    if (length >= 5) return null;

    return <TimerPicker onAddTime={onNewTimeAdded} />;
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="medium"
          text="Decline all proposed times"
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
          text={`If none of the proposed time suits you, feel free to propose a time that works better.`}
          css={bodyTextTypographyStyles}
        />
        {renderProposedTimes()}
        {renderTimePicker()}
        <Input
          type="text-area"
          placeholder="Optional comment"
          value={form.values.reply || ""}
          numRows={4}
          onChange={(value) => form.setFieldValue("reply", value)}
          css={commentInputStyles}
        />
      </ModalBodyContainer>
      <ModalFooterContainer>
        <Button
          text="GO BACK"
          onClick={() => modalContext.close()}
          buttonTextCss={goBackButtonTextStyles}
          css={goBackButtonStyles}
        />
        <Button
          text="DECLINE ALL"
          disabled={form.isValid || declineForm.isSubmitting}
          isLoading={declineForm.isSubmitting}
          onClick={declineForm.handleSubmit}
          css={declineButtonStyles}
        />
        <Button
          disabled={!form.isValid || form.isSubmitting}
          isLoading={form.isSubmitting}
          text="PROPOSE NEW TIME(S)"
          onClick={form.handleSubmit}
          css={acceptButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default DeclineCallModal;
