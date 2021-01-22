import * as Yup from "yup";
import { LoginFormType } from "../../types/screens/Login";
import {
  REQUIRED_FIELD_MESSAGE,
  NOT_VALID_EMAIL_MESSAGE,
} from "../../constants/messages";

export const schemaValues: LoginFormType = {
  email: "",
  password: "",
};

export const schema = Yup.object().shape({
  email: Yup.string()
    .email(NOT_VALID_EMAIL_MESSAGE)
    .required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string().required(REQUIRED_FIELD_MESSAGE),
});
