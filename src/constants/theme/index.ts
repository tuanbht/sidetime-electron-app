import THEMES from "./themes";
import { ThemeEntryType } from "../../types/theme";

const theme: ThemeEntryType =
  THEMES.find((themeEntry) => themeEntry.key === "DEFAULT") || THEMES[0];

export default theme;
