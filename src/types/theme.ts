export type ThemeEntryType = {
  key: string;
  palette: {
    grey50: string;
    grey10: string;
    grey100: string;
    black: string;
    green: string;
    red: string;
    redDisabled: string;
    greenDisabled: string;
    dodgerBlue: string;
    orangish: string;
    darkGrey: string;
    slateGrey: string;
    blueGrey: string;
    white: string;
  };
  fonts: {};
};

export type ThemeType = {
  theme: ThemeEntryType;
};
