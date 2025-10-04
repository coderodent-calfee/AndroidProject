import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/Button";
import Text from "../components/Text";
import GameIdInput from "../components/GameIdInput";
import GameId from "../components/GameId";

import { useAppNavigation } from "../providers/NavigationProvider";
import { useAuth } from "../providers/AuthProvider";

export default function GuestScreen() {
    const { navigate } = useAppNavigation();
    const { username } = useAuth();
    const [gameId, setGameId] = useState("");

    return (
        <View style={styles.container}>

            <Text size={10}>
                GuestScreen
            </Text>

            <Button size={10} title="EmptyScreen" onPress={() => navigate("EmptyScreen")} />
            <Button size={10} title="GuestScreen" onPress={() => navigate("GuestScreen")} />
            <Button size={10} title="LobbyScreen" onPress={() => navigate("LobbyScreen")} />

            <Text style={[styles.title, { textAlign: "center" }]}>Welcome to the search page, {username || 'Guest'}</Text>

            <Text size={20} style={[{ textAlign: "center" }]}>Enter the code for the game room you wish to join:</Text>
            <GameIdInput onChange={(id, isComplete) => {
                if (isComplete) {
                    console.log("Game ID is complete:", id);
                    setGameId(id);
                    navigate('Game', { gameId: `${id}` });
                }
            }} />

            <GameId gameId={gameId} />

            {/* Navigation back to Home */}
            <Button title="Go to Home" onPress={() => navigate("IndexScreen")} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#282c34',
    },

    title: { fontSize: 24 },
});
