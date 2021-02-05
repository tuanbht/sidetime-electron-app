import * as Yup from "yup";
import { REQUIRED_FIELD_MESSAGE } from "../../constants/messages";
import { TimePickerFormType } from "../../types/components/TimerPicker";

export const schemeValues: TimePickerFormType = {
  date: "",
  time: "",
};

export const schema = Yup.object().shape({
  date: Yup.string().required(REQUIRED_FIELD_MESSAGE),
  time: Yup.string().required(REQUIRED_FIELD_MESSAGE),
});

export const TIME_SLOTS = (): string[] => {
  const periodsOfTheDay = ["AM", "PM"];
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minutes = ["00", "30"];

  return periodsOfTheDay
    .map((periodOfTheDay) => {
      return hours
        .map((hour) => {
          return minutes.map((minute) => `${hour}:${minute} ${periodOfTheDay}`);
        })
        .flat();
    })
    .flat();
};
