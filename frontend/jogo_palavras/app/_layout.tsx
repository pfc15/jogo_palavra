import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';



export default function RootLayout() {
    const theme = useColorScheme(); // Returns "light" or "dark"

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={theme==="dark" ? DarkTheme:DefaultTheme}>
    <Stack
    screenOptions={{headerShown:false}}
      >
    <Stack.Screen
        name="home"
        options={{headerShown: false}}

    />
    <Stack.Screen
        name="(game)"
        options={{headerShown:false}}
    />

    </Stack>
    </ThemeProvider>);
}
