import globals from '@/globals';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from "react-native";
import { Stack, Tabs } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

export default function TabLayout() {
    const theme = useColorScheme(); // Returns "light" or "dark"
    
  return (
    <ThemeProvider value={theme==="dark" ? DarkTheme:DefaultTheme}>
    <Tabs screenOptions={{ tabBarActiveTintColor: globals.accentColor , headerShown:false}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'game',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gamepad" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat_room"
        options={{
          title: "chat",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comment" color={color} />,
        }}
      />
    </Tabs>
    </ThemeProvider>
  );
}
