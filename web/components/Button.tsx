// components/Button.tsx
import React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { FONT_MAP } from "../constants/fonts";
import Text from "../components/Text";

type Props = {
  title: string;
  size?: number;
  onPress: () => void;
  fontWeight?: keyof typeof FONT_MAP; // e.g., "regular", "bold", etc.
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  fontWeight = "regular",
  size = 30,
  style,
  disabled = false,
  textStyle }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        
        style]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={[
        styles.buttonText,
        { fontFamily: FONT_MAP[fontWeight], fontSize: size },
        disabled && styles.disabledText,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4B0082",
    paddingVertical: 2,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,

  },
  buttonText: {
    color: "white",
    fontSize: 24,
    size: 24,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#250041",
    borderColor: "#888",
  },
  disabledText: {
    color: "#888",
  }
});
