import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "../utilities/rootNavigatationRef";
import Home from "../screens/Home";
import Game from "../screens/Game";
import SelectImage from "../screens/SelectImage";
import SplashScreen from "../screens/components/SplashScreen";
import { StatusBar } from "native-base";

export const HOME_NAV = "Home";

export type RootStackParamList = {
  Home: undefined;
  SelectImage: undefined;
  Game: undefined;
  SplashScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <StatusBar barStyle={"light-content"} />
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="SelectImage" component={SelectImage} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default RootNavigator;
