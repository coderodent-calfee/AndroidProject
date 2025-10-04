
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

export default function IndexScreen() {
    const { navigate } = useAppNavigation();
    const {
        username,
        setUsername,
        userId,
        token,
        loggedIn,
        login,
        signUp,
        logout } = useAuth();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { makeGetRequest, makePostRequest } = useRequest();
    const { screenSize, appStyles } = useUI();
    const [serverStatus, setServerStatus] = useState("Checking...");


    const canLogin = username.length > 0 && password.length > 0;
    useEffect(() => {
        console.log("RWC useEffect makeGetRequest");

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


    const handleLoginOrSignUp = async (
        action: "login" | "signup",
        fn: () => Promise<boolean>
    ) => {
        console.log(`handle${action.charAt(0).toUpperCase() + action.slice(1)}`);

        const success = await fn();
        if (success) {
            console.log(`RWC ${action} successful`);
        } else {
            console.log(`RWC ${action} failed`);
        }
    };

    const handleSignUp = () => {
        if (!(canLogin && email)) return;

        handleLoginOrSignUp("signup", () => signUp(username, password, email));
    };

    const handleLogIn = () => {
        if (!canLogin) return;

        handleLoginOrSignUp("login", () => login(username, password));
    };

    const handleLogout = () => {
        if (!loggedIn) return;

        logout();
    };

    const handleNewGame = () => {
        if (!loggedIn) return;
        console.log("RWC New Game");
        const options = { userId };
        makePostRequest("/api/game/new/", {}, { userId })
            .then((data) => {
                console.log("RWC New Game created", data);
            })
            .catch((err) => {
                if (err instanceof MakeRequestError) {
                    console.log(`RWC catch Error ${err.status}: ${err.statusText}`);
                } else {
                    console.log(`RWC catch Network Error ${err.message}`);
                }
            });
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
                        <Button
                            title="New Game"
                            disabled={!loggedIn}
                            onPress={handleNewGame}
                        />
                    </View>
                    <>{!loggedIn && <Text size={20} style={{ textAlign: "center" }}>Sign in is required to start new games.</Text>}</>

                </View>
            }
            topRightCorner={
                <Text size={10}>TR</Text>
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
                        title="Test (change to push later)"
                        size={15}

                        onPress={() => navigate("TestScreen")}
                    />
                    <Button
                        title="Nav Test"
                        size={15}
                        onPress={() => navigate("TestScreen")}
                    />
                </View>}
            centralContent={
                <View style={[appStyles.columnFlow]}>
                    <Text style={[appStyles.smallText, { textAlign: "center" }]} >IndexScreen</Text>
                    {!loggedIn &&
                        <TextInput
                            size={30}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername} />}
                    {!loggedIn && !username &&
                        <Text size={20}>User Name is Required</Text>}
                    {!loggedIn &&
                        <TextInput
                            size={30}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry />}
                    {!loggedIn && !password &&
                        <Text size={20}>Password is Required</Text>}
                    {!loggedIn &&
                        <TextInput
                            size={30}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail} />}
                    {!loggedIn && !email &&
                        <Text size={20}>Email is Required to Sign Up</Text>}

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
                        {!loggedIn && <Button title="Sign Up" disabled={!email || !canLogin} onPress={handleSignUp}></Button>}
                        {!loggedIn && <Button title="Log In" onPress={handleLogIn} />}
                        {!loggedIn &&
                            <Button title="Join as Guest"
                                onPress={() => push("/guest")}
                            />
                        }
                    </View>
                </View>
            }
        />

    );
}

/* 

<PageLayout

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
                        title="Test (change to push later)"
                        size={15}

                        onPress={() => navigate("TestScreen")}
                    />
                    <Button
                        title="Nav Test"
                        size={15}
                        onPress={() => navigate("TestScreen")}
                    />
                </View>}
            

            
        />


*/