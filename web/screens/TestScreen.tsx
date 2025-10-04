//import { useRouter } from "expo-router";
import React, { useState } from "react";

import { ScrollView, StyleSheet, TextInput as RNTextInput } from "react-native";
import { View } from "react-native";

import Logo from "../components/Logo";
//hooks and providers
import { useAuth } from "../providers/AuthProvider";
import { useAppNavigation } from "../providers/NavigationProvider";
import { useRequest,  MakeRequestError } from "../providers/RequestProvider";

// components
import Button from "../components/Button";
import Text from "../components/Text";
import GameIdInput from "../components/GameIdInput";
import GameId from "../components/GameId";
import TextInput from "../components/TextInput";
import AceOfSpades from "../assets/images/cards/AS.svg";

export default function TestScreen() {
    const { navigate } = useAppNavigation();
    const [gameId, setGameId] = useState("0HIYOU");

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
        >
            <Text size={10} style={styles.heading}>
                TestScreen
            </Text>
            {/* <AceOfSpades height="25%" width="50%" /> */}
            <Text weight="regular" size={24} style={styles.heading}>
                Font & Button Examples
            </Text>
            {/* <Logo /> */}

            {/* Font Examples */}
            <Text weight="extralight" size={16}>Mitr ExtraLight size=16</Text>
            <Text weight="light" size={16}>Mitr Light</Text>
            <Text weight="regular" size={16}>Mitr Regular</Text>
            <Text weight="medium" size={16}>Mitr Medium</Text>
            <Text weight="semibold" size={16}>Mitr SemiBold</Text>
            <Text weight="bold" size={16}>Mitr Bold</Text>
            <Text weight="extralight" size={26} color="red">Mitr ExtraLight size=26</Text>
            <Text weight="light" size={26}>Mitr Light</Text>
            <Text weight="regular" size={26}>Mitr Regular</Text>
            <Text weight="medium" size={26}>Mitr Medium</Text>
            <Text weight="semibold" size={26}>Mitr SemiBold</Text>
            <Text weight="bold" size={26}>Mitr Bold</Text>
            {/* Buttons */}
            <Button title="Primary Button" onPress={() => { }} />
            <Button title="Secondary Button" onPress={() => { }} />
            <GameIdInput onChange={(id,isComplete) => {
                if(isComplete){ 
                    console.log("Game ID is complete:", id);
                    setGameId(id);

                }
            }}/>
            <GameId gameId={gameId} />


            {/* Navigation back to Home */}
            <Button title="Go to Home" onPress={() => navigate("Index")} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "flex-start", // aligns text/buttons to the left
        backgroundColor: '#282c34',
        flex: 1,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#282c34',
    },
    content: {
        flexGrow: 1, // makes content stretch to fill
        backgroundColor: '#282c34',
        alignItems: "flex-start", // aligns text/buttons to the left

        padding: 16,
    },
    heading: {
        marginBottom: 16,
    },
});
