// components/GameIdDisplay.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../components/Text";
import { FONT_MAP } from "../constants/fonts";
import { colors, inputTextStyleTest } from "../constants/textStyles";



type Props = {
  gameId: string;
  size?: number;
  borderColor?: string;
};

export default function GameIdDisplay({ gameId, size = 38, borderColor = "white" }: Props) {
  const chars = gameId.split("");

  return (
    <View style={styles.row}>
      {chars.map((char, index) => (
        <View
          key={index}
          style={[
            styles.box,
            { 
                backgroundColor: colors[index] || borderColor, 
                borderColor: colors[index] || borderColor, 
                width: size+22, height: size+20 },
          ]}
        >
          <Text style={[{ 
            fontSize: size,
            fontFamily: FONT_MAP.semibold 
          }]}>{char}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    
  },
  box: {
    //width: 70,
    //height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
