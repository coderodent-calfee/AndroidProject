import React, { useEffect, useState } from "react";

// components
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import PageLayout from "../components/PageLayout";

//hooks and providers
import { useAuth } from "../providers/AuthProvider";
import { useAppNavigation } from "../providers/NavigationProvider";
import { useRequest } from "../providers/RequestProvider";
import { MakeRequestError } from "../providers/Request";

import AceOfSpades from "../assets/images/cards/AS.svg";
import { useUI } from "../providers/UIProvider";
import GameId from "../components/GameId";

type GameScreenProps = {
    gameId: string;
};

export default function GameScreen({ gameId }: GameScreenProps) {
    const {  navigate } = useAppNavigation();
    const {
        username,
        setUsername,
        userId,
        token,
        loggedIn,

        logout } = useAuth();

    const { makeGetRequest, makePostRequest } = useRequest();
    const { screenSize, appStyles } = useUI();
    const [serverStatus, setServerStatus] = useState("Checking...");


    useEffect(() => {


        makeGetRequest<User[]>("/api/accounts/")
            .then((data) => setServerStatus(`✅`))
            .catch((err) => {
                setServerStatus(`❌`);
            });
    }, []);

    const handleLogout = () => {
        if (!loggedIn) return;

        logout();
    };



    return (
        <PageLayout
            cornerSize={screenSize.corner}
            topLeftCorner={<Logo id="top-left-corner-icon" />}
            topContent={
                <View style={appStyles.columnFlow}>
                    <View style={appStyles.rowFlow}>
                        <Button title="Look For Another Game"
                            onPress={() => { console.log("Look For Another Game"); loggedIn ? push("/lobby") : push("/guest"); }}
                        />

                    </View>
                </View>
            }
            topRightCorner={
                <View style={appStyles.columnFlow}>
                    <AceOfSpades height="100%" width="100%" />
                </View>
            }
            leftSideContent={
                <View style={appStyles.columnFlow}>
                    <Button
                        title="Logout"
                        disabled={!loggedIn}
                        size={15}
                        onPress={handleLogout}
                        style={{ width: "100%" }}
                    />
                    <Button
                        title="Player 1"
                        onPress={() => { }}
                    />
                </View>}
            centralContent={
                <View style={[appStyles.columnFlow]}>
                    <Text size={20} style={[{ textAlign: "center" }]}>You are in Game Room:</Text>
                    <GameId gameId={gameId} />
                    <Text size={20} style={[{ textAlign: "center" }]}>Currently Waiting on other Players:</Text>
                </View>}
            rightSideContent={
                <View style={appStyles.columnFlow}>
                    <Text style={appStyles.smallText}>width: {screenSize.width} height: {screenSize.height}</Text>
                    <Text style={[appStyles.smallText]} >Server: {serverStatus}</Text>
                </View>}
            bottomContent={
                <View style={appStyles.columnFlow}>
                    <>{loggedIn && userId && <Text style={appStyles.smallText}>userId: {userId}</Text>}</>
                    <>{token && <Text style={[appStyles.smallText]}>JSON Web Token Present</Text>}</>
                    <View style={[appStyles.rowFlow, { flex: 0, justifyContent: "space-between" }]}>
                        <Button title="Go to Home" onPress={() => navigate("IndexScreen")} />
                        <Button title="Game Info" onPress={() => { }} />
                    </View>
                </View>
            }
        />

    );
}

/* 


import React, { useEffect, useState } from "react";

// components
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import PageLayout from "../components/PageLayout";

//hooks and providers
import { useAuth } from "../providers/AuthProvider";
import { useAppNavigation } from "../providers/NavigationProvider";
import { useRequest } from "../providers/RequestProvider";
import { MakeRequestError } from "../providers/Request";

import AceOfSpades from "../assets/images/cards/AS.svg";
import { useUI } from "../providers/UIProvider";

interface User {
    username: string;
    email: string;
    userId?: string;
}

export default function Index() {
    const { push } = useAppNavigation();
    const {
        username,
        setUsername,
        userId,
        token,
        loggedIn,

        logout } = useAuth();

    const { makeGetRequest, makePostRequest } = useRequest();
    const {screenSize, appStyles} = useUI();
    const [serverStatus, setServerStatus] = useState("Checking...");


    useEffect(() => {


        makeGetRequest<User[]>("/api/accounts/")
            .then((data) => setServerStatus(`✅`))
            .catch((err) => {
                if (err instanceof MakeRequestError) {
                    console.log(`RWC catch Error ${err.status}: ${err.statusText}`);
                    setServerStatus(`❌ Error ${err.status}: ${err.statusText}`);
                } else {
                    console.log(`RWC catch Network Error ${err.message}`);
                    setServerStatus(`❌ Network error: ${err.message}`);
                }
            });
    }, []);

    const handleLogout = () => {
        if (!loggedIn) return;

        logout();
    };



    return (
        <PageLayout
            cornerSize={screenSize.corner}
            topLeftCorner={<Logo id="top-left-corner-icon" />}
            topContent={
                <View style={appStyles.columnFlow}>
                    <View style={appStyles.rowFlow}>
                        <Button title="Look For Game"
                            onPress={() => { console.log("Look For Game"); loggedIn ? push("/lobby") : push("/guest"); }}
                        />

                    </View>
                </View>
            }
            topRightCorner={
                <View style={appStyles.columnFlow}>
                    <AceOfSpades height="100%" width="100%" />
                </View>
            }
            leftSideContent={
                <View style={appStyles.columnFlow}>
                    <Button
                        title="Logout"
                        disabled={!loggedIn}
                        size={15}
                        onPress={handleLogout}
                        style={{ width: "100%" }}
                    />
                    <Button
                        title="Player 1"
                        onPress={() =>{}}
                    />
                </View>}
            centralContent={
                <View style={[appStyles.columnFlow]}>
            <GameId gameId={gameId} />
                            </View>}
            rightSideContent={
                <View style={appStyles.columnFlow}>
                    <Text style={appStyles.smallText}>width: {screenSize.width} height: {screenSize.height}</Text>
                    <Text style={[appStyles.smallText]} >Server: {serverStatus}</Text>
                </View>}
            bottomContent={
                <View style={appStyles.columnFlow}>
                    <>{loggedIn && userId && <Text style={appStyles.smallText}>userId: {userId}</Text>}</>
                    <>{token && <Text style={[appStyles.smallText]}>JSON Web Token Present</Text>}</>
                    <View style={[appStyles.rowFlow, { flex: 0, justifyContent: "space-between" }]}>
                        <Button title="Go to Home" onPress={() => push("/")} />
                        <Button title="Game Info" onPress={() => {}} />
                    </View>
                </View>
            }
        />

    );
}



*/