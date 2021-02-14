import { useFormik } from "formik";
import React from "react";
import useAppContext from "../../../hooks/useAppContext";
import { CommentCreatePropsType } from "../../../types/components/Comments";
import Button from "../../Button";
import Input from "../../Input";
import { schema, schemaValues } from "./form";
import {
  StyledContainer,
  commentInputStyles,
  sendButtonStyles,
} from "./styles";

const CommentCreate: React.FC<CommentCreatePropsType> = (props) => {
  const { callRequest } = props;
  const { callRequestCommentsStore } = useAppContext();
  const form = useFormik({
    initialValues: schemaValues,
    validationSchema: schema,
    onSubmit: (values) => {
      form.setSubmitting(true);
      callRequestCommentsStore
        .createComment(callRequest, values)
        .then(() => {
          form.resetForm();
        })
        .finally(() => form.setSubmitting(false));
    },
  });

  return (
    <StyledContainer>
      <Input
        placeholder="Write your message here"
        type="text-area"
        numRows={2}
        value={form.values.message || ""}
        onChange={(e) => form.setFieldValue("message", e)}
        inputCss={commentInputStyles}
      />
      <Button
        isLoading={form.isSubmitting}
        disabled={form.isSubmitting}
        onClick={form.handleSubmit}
        text="SEND"
        css={sendButtonStyles}
      />
    </StyledContainer>
  );
};

export default CommentCreate;
