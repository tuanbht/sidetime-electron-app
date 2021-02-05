import * as Yup from "yup";
import { REQUIRED_FIELD_MESSAGE } from "../../../constants/messages";
import { RescheduleCallFormType } from "../../../types/components/RescheduleCallModal";

export const schemaValues: RescheduleCallFormType = {
  reply: "",
  proposed_times: [],
};

export const schema = Yup.object().shape({
  reply: Yup.string(),
  proposed_times: Yup.array().min(1).max(5).required(REQUIRED_FIELD_MESSAGE),
});
