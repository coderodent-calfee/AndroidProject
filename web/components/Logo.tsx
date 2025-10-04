// components/Logo.tsx
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/rwc.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  image: {
    // width: 150,
    // height: 150,
  },
});
