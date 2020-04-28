import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import Calendar from "../components/Calendar";

class WorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: "none",
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white",
    },
  });

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
            flex: 0.9,
            alignSelf: "stretch",
          }}
        >
          <Calendar
            gesture={this.state.gestureName}
            callBack={this.gotDate}
            suppliedDate={this.props.navigation.state.params.date}
          />
        </GestureRecognizer>
      </View>
    );
  }
}

export default WorkoutScreen;
