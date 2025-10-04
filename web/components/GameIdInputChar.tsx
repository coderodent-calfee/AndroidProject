// components/GameIdInputChar.tsx
import React, { forwardRef } from "react";
import { TextInput as RNTextInput, StyleSheet, TextStyle, StyleProp } from "react-native";
import { colors, inputTextStyleTest } from "../constants/textStyles";
import { FONT_MAP } from "../constants/fonts";

type Props = {
  index: number;
  char: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  borderColor?: string;
  onChange: (char: string, index: number) => void;
  onKeyPress?: (e: any, index: number) => void;
};

const GameIdInputChar = forwardRef<RNTextInput, Props>(
  ({ index, char, size = 44, style, borderColor = "white", onChange, onKeyPress }, ref) => {
    return (
      <RNTextInput
        ref={ref}
        style={[
          styles.input,
          { borderColor: colors[index] || borderColor, fontSize: size },
          style,
        ]}
        value={char}
        onChangeText={(text) => onChange(text, index)}
        onKeyPress={(e) => onKeyPress && onKeyPress(e, index)}
        keyboardType="default"
        textAlign="center"
        maxLength={2}
//         placeholder="-"
        autoCapitalize="characters"
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    minWidth: 60,
    width: 30,
    height: 75,
    margin: 5,
    paddingBottom: 0,
    borderWidth: 8,
    // margin: 5,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    fontFamily: FONT_MAP.light
  },
});

export default GameIdInputChar;
