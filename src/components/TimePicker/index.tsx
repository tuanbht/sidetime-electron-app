import React from "react";
import Input from "../Input";
import Button from "../Button";
import { TimePickerPropsType } from "../../types/components/TimerPicker";
import { useFormik } from "formik";
import { schema, schemeValues, TIME_SLOTS } from "./form";

import {
  StyledContainer,
  TimeOption,
  addTimeButtonStyles,
  addTimeButtonTextStyles,
  inputStyles,
} from "./styles";
import dayjs from "dayjs";

const TimerPicker: React.FC<TimePickerPropsType> = ({ onAddTime }) => {
  const form = useFormik({
    enableReinitialize: false,
    initialValues: schemeValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const date = new Date(`${values.date} ${values.time}`);
      const formated = dayjs(date).format("YYYY-MM-DD HH:mm:00 ZZ");
      onAddTime(formated);
    },
  });
  return (
    <StyledContainer>
      <Input
        label="Date"
        type="date"
        value={form.values.date}
        onChange={(value) => form.setFieldValue("date", value)}
        error={form.errors.date}
        css={inputStyles}
      />
      <Input
        type="select"
        label="Time"
        value={form.values.time}
        onChange={(value) => form.setFieldValue("time", value)}
        error={form.errors.time}
        css={inputStyles}
      >
        <>
          <TimeOption value=""></TimeOption>
          {TIME_SLOTS().map((time) => {
            return (
              <TimeOption key={time} value={time}>
                {time}
              </TimeOption>
            );
          })}
        </>
      </Input>

      <Button
        text="ADD TIME"
        onClick={form.handleSubmit}
        disabled={!form.isValid}
        css={addTimeButtonStyles}
        buttonTextCss={addTimeButtonTextStyles}
      />
    </StyledContainer>
  );
};

export default TimerPicker;
