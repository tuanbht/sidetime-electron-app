import * as Yup from "yup";
import { CancelCallModalFormType } from "../../../types/components/CancelCallModal";

export const schemaValues: CancelCallModalFormType = {
  reply: "",
};

export const schema = Yup.object().shape({
  reply: Yup.string(),
});
