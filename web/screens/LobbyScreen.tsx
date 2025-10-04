import React, { useEffect, useState } from "react";

//hooks and providers
import { useAuth } from "../providers/AuthProvider";
import { useAppNavigation } from "../providers/NavigationProvider";
import { useRequest,  MakeRequestError } from "../providers/RequestProvider";

// components
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Text from "../components/Text";
import GameIdInput from "../components/GameIdInput";
import GameId from "../components/GameId";
import TextInput from "../components/TextInput";


export default function LobbyScreen() {
    const { username } = useAuth();
    const { navigate } = useAppNavigation();
    const [gameId, setGameId] = useState("0HIYOU");
    return (
        <View style={styles.container}>
            <Text size={10} style={styles.heading}>
                LobbyScreen
            </Text>            
            <Text style={styles.title}>Welcome to the Lobby {username}</Text>
            
            <Button size={10} title="EmptyScreen" onPress={() => navigate("EmptyScreen")} />
            <Button size={10} title="GuestScreen" onPress={() => navigate("GuestScreen")} />

            <Text style={styles.title}>Enter the code for the game room you wish to join:</Text>
            <GameIdInput onChange={(id,isComplete) => {
                if(isComplete){ 
                    console.log("Game ID is complete:", id);
                    setGameId(id);
                    navigate('Game', {gameId:  `${id}`});
                }
            }}/>
            {/* <Text style={styles.title}>Or create a new game room:</Text> */}
            {/* <Button title="New Game Room" onPress={() => push("/")} /> */}
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
