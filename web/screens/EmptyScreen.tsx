import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet } from "react-native";
import { useAppNavigation } from "../providers/NavigationProvider";

import { useRequest, MakeRequestError } from "../providers/RequestProvider";

// components
import Text from "../components/Text";
import Button from "../components/Button";

export default function EmptyScreen() {
    const { navigate } = useAppNavigation();
    const [gameId, setGameId] = useState("0HIYOU");
    const { makeGetRequest, makePostRequest } = useRequest();
    const [serverStatus, setServerStatus] = useState("Checking...");
    const [httpsServerStatus, setHttpsServerStatus] = useState("Checking...");
    useEffect(() => {
        console.log("RWC useEffect makeGetRequest");
        makeGetRequest<User[]>("/api/game/", { protocol: "http", port: 8000 })
            .then((data) => setServerStatus(`✅`))
            .catch((err) => {
                console.log(`RWC catch EmptyScreen Error ${err.status}: ${err.statusText} ${err.message}`);
                setServerStatus(`❌`);
            });
        makeGetRequest<User[]>("/api/accounts/")
            .then((data) => {
                console.log("RWC EmptyScreen HTTPS Success:", data);
                setHttpsServerStatus(`✅`);
            })
            .catch((err) => {
                console.log(`RWC catch EmptyScreen Error ${err.status}: ${err.statusText} ${err.message}`);
                setHttpsServerStatus(`❌`);
            });
    }, []);

// navigate('GuestScreen');
//<Button size={15} title="GuestScreen" onPress={() => {navigate('GuestScreen'); }} />

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
        >
            <Text size={25} style={styles.heading}>
                EmptyScreen no req 0w0
            </Text>
            <Text size={15} >Server: {serverStatus}</Text>
            <Text size={15} >Https Server: {httpsServerStatus}</Text>
            {/* Buttons */}
            <Button size={15} title="Empty Butt0n" onPress={() => { }} />
            <Button size={15}  title="LobbyScreen" onPress={() => navigate("LobbyScreen")} />
            <Button  size={15} title="GuestScreen" onPress={() => navigate("GuestScreen")} />
            <Button  size={15} title="IndexScreen" onPress={() => navigate("IndexScreen")} />

            <Button  size={15} title="PageLayoutScreen" onPress={() => navigate("PageLayoutScreen")} />
                
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
