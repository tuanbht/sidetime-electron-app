import * as Yup from "yup";
import { REQUIRED_FIELD_MESSAGE } from "../../../constants/messages";
import { RescheduleCallFormType } from "../../../types/components/RescheduleCallModal";

export const schemaValues: RescheduleCallFormType = {
  reply: "",
  proposedTimes: [],
};

export const schema = Yup.object().shape({
  reply: Yup.string(),
  proposedTimes: Yup.array().min(1).max(5).required(REQUIRED_FIELD_MESSAGE),
});
