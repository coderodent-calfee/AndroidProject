// constants/textStyles.ts
import { TextStyle } from "react-native";
import { FONT_MAP } from "../constants/fonts";

// Shared base for all text
export const baseTextStyle: TextStyle = {
  color: "white",
  fontSize: 48,
  fontFamily: FONT_MAP.regular,
};

// Extra tweaks specifically for inputs
export const inputTextStyle: TextStyle = {
  ...baseTextStyle,
  fontSize: 28,
  paddingVertical: 30, // removes extra lift
  includeFontPadding: false, // Android fix
  textAlignVertical: "center", // Android fix
  lineHeight: (baseTextStyle.fontSize ?? 48) * 0.3
};

export const inputTextStyleTest: TextStyle = {
  ...baseTextStyle,
  backgroundColor: "#39393aff",
  paddingVertical: 2,
  paddingHorizontal: 24,
  borderRadius: 8,
  alignItems: "center",
  borderWidth: 2,
  borderColor: "white",
  marginBottom: 10,
  textAlignVertical: "center", // Android fix
};

export const colors = ["#FF0000", "#ff5e00ff", "#CCCC00", "#37b137ff", "#3a3affff", "#8903e9ff"];

