import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import Calendar from "./src/components/Calendar";
import Add_Exercise from "./src/components/Add_Exercise";

let currentDateObject;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: "none",
      currentDateObject: "",
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
          onSwipe={(direction) => {
            this.setState({ gestureName: direction });
          }}
          config={config}
          style={{
            flex: 0.8,
          }}
        >
          <Calendar gesture={this.state.gestureName} callBack={this.gotDate} />
          {/* <Add_Exercise date={currentDateObject} /> */}
        </GestureRecognizer>
      </View>
    );
  }
}

export default App;
