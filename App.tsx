/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView
} from 'react-native-safe-area-context';
import { RequestProvider } from './web/providers/RequestProvider';
import EmptyScreen from './web/screens/EmptyScreen';
import GameScreen from './web/screens/GameScreen';
import IndexScreen from './web/screens/IndexScreen';
import GuestScreen from './web/screens/GuestScreen';
import TestScreen from './web/screens/TestScreen';
import LobbyScreen from './web/screens/LobbyScreen';
import PageLayoutScreen from './web/screens/PageLayoutScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider, navigationRef } from './web/providers/NavigationProvider';
import { AuthProvider } from './web/providers/AuthProvider';
import { UIProvider } from './web/providers/UIProvider';

type RootStackParamList = {
  GameScreen: { gameId: string };
  LobbyScreen: undefined;
  EmptyScreen: undefined;
  TestScreen: undefined;
  GuestScreen: undefined;
  IndexScreen: undefined;
  PageLayoutScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


//                     <Stack.Screen name="EmptyScreen" component={EmptyScreen} options={{ title: "EmptyScreen" }} />





function withSafeArea<T>(ScreenComponent: React.ComponentType<T>) {
  return function WrappedScreen(props: T) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenComponent {...props} />
      </SafeAreaView>
    );
  };
}

/*




    // works
    <SafeAreaProvider>
      <AuthProvider>
        <RequestProvider>
          <UIProvider>
            <NavigationProvider>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="EmptyScreen">
                  <Stack.Screen name="EmptyScreen" component={withSafeArea(EmptyScreen)} options={{ title: "Safe Auth Req UI Nav Stack" }} />
                </Stack.Navigator>
              </NavigationContainer>
            </NavigationProvider>
          </UIProvider>
        </RequestProvider>
      </AuthProvider>
    </SafeAreaProvider>
  

    

*/


function App() {

  const SafeEmptyScreen = withSafeArea(EmptyScreen);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RequestProvider>
          <UIProvider>
            <NavigationProvider>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="IndexScreen" >
                  <Stack.Screen
                    name="EmptyScreen"
                    component={withSafeArea(EmptyScreen)}
                    options={{ title: "EmptyScreen" }}
                  />
                  <Stack.Screen
                    name="LobbyScreen"
                    component={withSafeArea(LobbyScreen)}
                    options={{ title: "LobbyScreen" }}
                  />
                  <Stack.Screen
                    name="GuestScreen"
                    component={withSafeArea(GuestScreen)}
                    options={{ title: "GuestScreen" }}
                  />
                  <Stack.Screen
                    name="TestScreen"
                    component={withSafeArea(TestScreen)}
                    options={{ title: "TestScreen" }}
                  />
                  <Stack.Screen
                    name="IndexScreen"
                    component={withSafeArea(IndexScreen)}
                    options={{ title: "IndexScreen" }}
                  />
                  <Stack.Screen
                    name="GameScreen"
                    component={withSafeArea(GameScreen)}
                    options={{ title: "GameScreen" }}
                  />
                                    
                  <Stack.Screen
                    name="PageLayoutScreen"
                    component={withSafeArea(PageLayoutScreen)}
                    options={{ title: "PageLayoutScreen" }}
                  />
                  
                </Stack.Navigator>
              </NavigationContainer>
            </NavigationProvider>
          </UIProvider>
        </RequestProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Mitr-Light',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
});
export default App;
