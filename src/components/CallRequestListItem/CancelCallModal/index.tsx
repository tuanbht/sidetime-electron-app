import React from "react";
import HorizontalDivider from "../../HorizontalDivider";
import Typography from "../../Typography";
import Button from "../../Button";
import Input from "../../Input";
import useAppContext from "../../../hooks/useAppContext";
import useModalContext from "../../../hooks/useModalContext";
import { useFormik } from "formik";
import { X, AlertCircle } from "react-feather";
import {
  getCallPartnerNameBasedOnPerspective,
  isChargeableCancellationFee,
} from "../../../utils/callrequest";
import { schema, schemaValues } from "./form";
import {
  goBackButtonStyles,
  cancelCallRequestButtonStyles,
  disclaimerIconStyles,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  modalHeaderTypographyStyles,
  confirmationTypographyStyles,
  disclaimerTypographyStyles,
  StyledContainer,
  closeButtonIconStyles,
  goBackButtonTextStyles,
  closeButtonStyles,
  DisclaimerContainer,
} from "./styles";
import useCallRequestItemContext from "../../../hooks/useCallRequestItemContext";

const CancelCallModal: React.FC = () => {
  const { callRequestStore, notificationStore, authStore } = useAppContext();
  const modalContext = useModalContext();
  const { callRequest, updateCallRequest } = useCallRequestItemContext();

  const form = useFormik({
    enableReinitialize: false,
    initialValues: schemaValues,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      form.setSubmitting(true);
      callRequestStore
        .setCallRequestAsCanceled(callRequest, values)
        .then((response) => {
          // TODO: Replace call request with new response for new serializers
          updateCallRequest(callRequest);
          const callPartner = getCallPartnerNameBasedOnPerspective(
            callRequest,
            authStore.currentUser
          );
          const message = `You have successfully cancelled the call with ${callPartner}`;
          notificationStore.setSuccessNotification(message);
        })
        .catch((err) => {
          notificationStore.setErrorNotification(err.data[0]);
        })
        .finally(() => {
          modalContext.close();
          form.setSubmitting(false);
        });
    },
  });

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="bold"
          text="Cancel the call"
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
          text="Are you sure you want to cancel this call?"
          css={confirmationTypographyStyles}
        />
        {isChargeableCancellationFee(callRequest, authStore.currentUser) && (
          <DisclaimerContainer>
            <AlertCircle size={48} style={disclaimerIconStyles} />
            <Typography
              variant="regular"
              text="Cancelling the call less than 24 hours before the start incurs a 20% cancellation fee."
              css={disclaimerTypographyStyles}
            />
          </DisclaimerContainer>
        )}
        <Input
          type="text-area"
          placeholder="Optional comment"
          value={form.values.reply || ""}
          numRows={4}
          onChange={(value) => form.setFieldValue("reply", value)}
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
          text="CANCEL THE CALL"
          disabled={form.isSubmitting}
          isLoading={form.isSubmitting}
          onClick={form.handleSubmit}
          css={cancelCallRequestButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default CancelCallModal;
