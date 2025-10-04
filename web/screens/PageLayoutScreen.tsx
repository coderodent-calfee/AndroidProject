import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet } from "react-native";
import { useAppNavigation } from "../providers/NavigationProvider";

import { useRequest, MakeRequestError } from "../providers/RequestProvider";
import PageLayout from "../components/PageLayout";

// components
import Text from "../components/Text";
import Button from "../components/Button";

export default function PageLayoutScreen() {
    const { navigate } = useAppNavigation();
    const [gameId, setGameId] = useState("0HIYOU");
    const { makeGetRequest, makePostRequest } = useRequest();
    const [serverStatus, setServerStatus] = useState("Checking...");
    const [httpsServerStatus, setHttpsServerStatus] = useState("Checking...");
    
    

// navigate('GuestScreen');
//<Button size={15} title="GuestScreen" onPress={() => {navigate('GuestScreen'); }} />
   return (
        <PageLayout
            cornerSize={100}
            topLeftCorner={
                <Text size={10}>TL</Text>
            }
            topContent={
                <Text size={10}>top</Text>
            }
            topRightCorner={
                <Text size={10}>TR</Text>
            }
            leftSideContent={
                <Text size={10}>left</Text>
            }
            centralContent={
                <><Text size={10}>central</Text><Button size={10} title="EmptyScreen" onPress={() => navigate("EmptyScreen")} /></> 
            }
            rightSideContent={
                <Text size={10}>right</Text>
            }
            bottomContent={
                <Text size={10}>bottom</Text>
            }
        />

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


/* 

D:\t\AndroidProject\web\screens\PageLayoutScreen.tsx: Unexpected token, expected "}" (31:12)
*/