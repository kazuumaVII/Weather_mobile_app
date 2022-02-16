import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../components/Homescreen";
import Param from "../components/param/Param";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="Param"
          component={Param}
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
