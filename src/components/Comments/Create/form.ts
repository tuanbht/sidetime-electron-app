import * as Yup from "yup";
import { CommentFormType } from "../../../types/components/Comments";
import { REQUIRED_FIELD_MESSAGE } from "../../../constants/messages";

export const schemaValues: CommentFormType = {
  message: "",
};

export const schema = Yup.object().shape({
  message: Yup.string().required(REQUIRED_FIELD_MESSAGE),
});
