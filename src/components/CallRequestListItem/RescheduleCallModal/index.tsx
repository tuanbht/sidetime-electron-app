import React from "react";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import useAppContext from "../../../hooks/useAppContext";
import { X } from "react-feather";
import { useFormik } from "formik";
import { schema, schemaValues } from "./form";
import { RescheduleCallModalPropsType } from "../../../types/components/CallRequestListItem";
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
  isExpertPerspective,
} from "../../../utils/callrequest";

const RescheduleCallModal: React.FC<RescheduleCallModalPropsType> = ({
  callRequest,
}) => {
  const {
    callRequestStore: { bounceCallRequest, updateCallRequest },
    notificationStore,
    authStore,
  } = useAppContext();
  const modalContext = useModalContext();

  const form = useFormik({
    enableReinitialize: false,
    validateOnMount: true,
    initialValues: schemaValues,
    validationSchema: schema,
    onSubmit: (values) => {
      form.setSubmitting(true);
      const action = isExpertPerspective(callRequest, authStore.currentUser)
        ? bounceCallRequest
        : updateCallRequest;

      action(callRequest, {
        ...values,
        reply_user_id: authStore.currentUser?.id || "",
      })
        .then(() => {
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
    form.setFieldValue("proposed_times", [...form.values.proposed_times, time]);
  };

  const onTimeRemoved = (index: number) => {
    form.setFieldValue(
      "proposed_times",
      form.values.proposed_times.filter((_, i) => index !== i)
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

  const renderBottomTimePicker = () => {
    const { length } = form.values.proposed_times;
    if (length === 0 || length >= 5) return null;

    return <TimerPicker onAddTime={onNewTimeAdded} />;
  };

  const renderCallPartnerName = () => {
    const { currentUser } = authStore;

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
        {form.values.proposed_times.length ? (
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
