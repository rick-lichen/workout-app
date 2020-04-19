import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import Calendar from "./src/components/Calendar";
import Add_Exercise from "./src/components/Add_Exercise";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: "none",
    };
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    });

    return (
      <View style={styles.container}>
        <GestureRecognizer
          onSwipe={(direction, state) => {
            const {
              SWIPE_UP,
              SWIPE_DOWN,
              SWIPE_LEFT,
              SWIPE_RIGHT,
            } = swipeDirections;
            this.setState({ gestureName: direction });
          }}
          config={config}
          style={{
            flex: 0.8,
          }}
        >
          <Calendar gesture={this.state.gestureName} />
          <Add_Exercise />
        </GestureRecognizer>
      </View>
    );
  }
}

export default App;
