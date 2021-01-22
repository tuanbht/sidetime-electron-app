import React, { useMemo } from "react";
import Typography from "../Typography";
import dayjs from "dayjs";
import { CalendarIconPropsType } from "../../types/components/CalendarIcon";
import {
  StyledContainer,
  MonthContainer,
  DayContainer,
  monthTypographyStyles,
  dayTypographyStyles,
  dayOfTheWeekTypographyStyles,
} from "./styles";

const CalendarIcon: React.FC<CalendarIconPropsType> = ({
  timestamp,
  month,
  day,
  dayofTheWeek,
}) => {
  const date = useMemo(() => {
    if (month && day && dayofTheWeek) {
      return { month, day, dayofTheWeek };
    }

    const parsed = dayjs(timestamp || new Date());
    return {
      month: parsed.format("MMM").toUpperCase(),
      day: parsed.format("D"),
      dayofTheWeek: parsed.format("ddd").toUpperCase(),
    };
  }, [timestamp, month, day, dayofTheWeek]);

  return (
    <StyledContainer>
      <MonthContainer>
        <Typography
          variant="bold"
          text={date.month || ""}
          css={monthTypographyStyles}
        />
      </MonthContainer>
      <DayContainer>
        <Typography
          variant="bold"
          text={date.day || ""}
          css={dayTypographyStyles}
        />
        <Typography
          variant="bold"
          text={date.dayofTheWeek || ""}
          css={dayOfTheWeekTypographyStyles}
        />
      </DayContainer>
    </StyledContainer>
  );
};

export default CalendarIcon;
