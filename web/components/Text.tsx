// components/Text.tsx
import React from "react";
import { Text as RNText, StyleProp, TextProps, TextStyle } from "react-native";
import { FONT_MAP } from "../constants/fonts";
import { baseTextStyle } from "../constants/textStyles";

type ExtraTextProps = {
  weight?: keyof typeof FONT_MAP;
  size?: number;
  color?: string;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
};

function cleanStyles(styles: any[]): any[] {
  if (!Array.isArray(styles)) return [];

  return styles.map((s) => {
    if (s && typeof s === "object") {
      const { size, ...rest } = s; // remove `size`
      return rest;
    }
    return s; // keep false/undefined/etc
  });
}

export default function Text({
  weight,
  size,
  color,
  align,
  style,
  ...props
}: TextProps & ExtraTextProps) {
  const styles = cleanStyles(style);
  return (
    <RNText
      {...props}
      style={[
        baseTextStyle,
        weight ? { fontFamily: FONT_MAP[weight] } : null, // sets fontFamily if present
        size ? { fontSize: size } : null,
        color ? { color } : null,
        align ? { textAlign: align } : null,
        styles, // always last so caller can override anything
      ]}
    />
  );
}