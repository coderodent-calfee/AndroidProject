import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../providers/AuthProvider';
import { RequestProvider } from '../providers/RequestProvider';
import { NavigationProvider } from '../providers/NavigationProvider.web';
import { UIProvider } from '../providers/UIProvider';
import { routes } from "../routes/routes";


export default function RootLayout() {
  const [loaded] = useFonts({
    "Mitr-SemiBold": require('../assets/fonts/Mitr/Mitr-SemiBold.ttf'),
    "Mitr-Bold": require('../assets/fonts/Mitr/Mitr-Bold.ttf'),
    "Mitr-ExtraLight": require('../assets/fonts/Mitr/Mitr-ExtraLight.ttf'),
    "Mitr-Light": require('../assets/fonts/Mitr/Mitr-Light.ttf'),
    "Mitr-Medium": require('../assets/fonts/Mitr/Mitr-Medium.ttf'),
    "Mitr-Regular": require('../assets/fonts/Mitr/Mitr-Regular.ttf')
  });

  if (!loaded) {
    return null; // await font
  }

  return (
    <NavigationProvider>
      <AuthProvider>
        <RequestProvider>
          <UIProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </UIProvider>
        </RequestProvider>
      </AuthProvider>
    </NavigationProvider>
  );
}
