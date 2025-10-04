// components/TextInput.tsx
import React from "react";
import { TextInput as RNTextInput, StyleProp, TextInputProps, TextStyle } from "react-native";
import { FONT_MAP } from "../constants/fonts";
import { inputTextStyle, inputTextStyleTest } from "../constants/textStyles";
import { Platform } from "react-native";


type ExtraInputProps = {
  weight?: keyof typeof FONT_MAP;
  size?: number;
  color?: string;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
};

export default function TextInput({
  weight,
  size,
  color,
  align,
  style,
  ...props
}: TextInputProps & ExtraInputProps) {
  return (
    <RNTextInput
      {...props}
      style={[
        inputTextStyleTest,
        weight ? { fontFamily: FONT_MAP[weight] } : null,
        size ? { fontSize: size } : null,
        color ? { color } : null,
        align ? { textAlign: align } : null,
        size ? { lineHeight: size * 0 } : null,
        { width: "100%" },
        style, 
      ]}
    />
  );
}