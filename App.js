import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import HomeScreen from "./src/screens/HomeScreen";
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Workout: WorkoutScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
