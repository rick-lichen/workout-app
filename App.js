import React from "react";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import HomeScreen from "./src/screens/HomeScreen";
import StatsScreen from "./src/screens/Stats";
import { Button } from "react-native";
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Workout: WorkoutScreen,
    Stats: StatsScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Home",
      headerRight: () => (
        <Button
          title="Stats"
          onPress={() => navigation.navigate("Stats", { title: "Your Stats" })}
        />
      ),
    }),
  }
);

export default createAppContainer(navigator);
