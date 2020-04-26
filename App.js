import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import HomeScreen from "./src/screens/HomeScreen";
import StatsScreen from "./src/screens/Stats";
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Workout: WorkoutScreen,
    Stats: StatsScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
