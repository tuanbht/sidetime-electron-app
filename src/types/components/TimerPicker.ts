export type TimePickerFormType = {
  date: string;
  time: string;
};
export type TimePickerPropsType = {
  onAddTime: (timePicked: string) => void;
};
