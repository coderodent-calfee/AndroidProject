// components/GameId.tsx
import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import GameIdInputChar from "./GameIdInputChar";
//import TextInputExample from "./GameIdInputChar";
const isWeb = Platform.OS === 'web';

const GAME_ID_LENGTH = 6;
type GameIdInputProps = {
  length?: number; // how many characters the Game ID should have
  onChange?: (value: string, isComplete: boolean) => void;
};

export default function GameIdInput({length = 6, onChange }: GameIdInputProps) {
  const [chars, setChars] = useState(Array(GAME_ID_LENGTH).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isComplete = chars.every(c => /^[A-Z0-9]$/.test(c));

  useEffect(() => {
    // // start with first input focused
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(chars.join(""), isComplete );
    }
  }, [chars, onChange, isComplete]);

  const handleChange = (newText: string, index: number) => {
    console.log(`RWC! handleChange at ${index} len ${newText.length} ${newText}`);

    if (newText.length === 0) {
      console.log(`RWC len === 0 `);
      return;
    }
    let newChar = "";
    let char = chars[index];

    if (newText.length > char.length) {
      for (let i = 0; i < newText.length; i++) {
        if (char !== newText[i]) {
          newChar = newText[i];
          break;
        }
      }
    } else if (char !== newText[0]) {
      newChar = newText[0];
    }

    if (false === /[A-Z0-9]/.test(newChar.toUpperCase())) {
      console.log(`not A-Z0-9 `);
      return;
    }

    setChars((prev) => {
      const updated = [...prev];
      updated[index] = newChar.toUpperCase(); // enforce uppercase
      console.log(`RWC handleChange:setChars at ${index} `, newChar.toUpperCase());
      console.log(`RWC handleChange:updated `, updated);
      return updated;
    });

    // move to next input automatically if valid
    if (newChar && index < GAME_ID_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const key = e.nativeEvent.key || e.key;
    console.log(`handleKeyPress at ${index} `, key);


    if (key === "Backspace") {
      setChars((prev) => {
        const updated = [...prev];
        updated[index] = "";
        return updated;
      });
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    if (key === "Delete") {
      setChars((prev) => {
        const updated = [...prev];
        updated[index] = "";
        return updated;
      });
      return;
    }

    if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (key === "ArrowRight" && index < GAME_ID_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      return;
    }
    if (!isWeb) {
      console.log(`not web `);
      return;
    }
    if (key.length > 1) {

      console.log(`RWC len > 1 `);

      return;

    }


    if (false === /[A-Z0-9]/.test(key.toUpperCase())) {
      console.log(`A-Z0-9 test failed `);
      return;
    }
    handleChange(key, index);
  };

  return (
    <View style={styles.row}>
      {chars.map((char, index) => (
        <GameIdInputChar
          key={index}
          ref={(el: TextInput | null) => (inputRefs.current[index] = el)}
          index={index}
          char={char}
          onChange={isWeb ? () => { } : handleChange}  // use handleChange only on mobil
          onKeyPress={handleKeyPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
});

