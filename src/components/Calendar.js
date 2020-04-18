import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

class Calendar extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let d = date.getDate();
    let m = this.numtoMonth(date.getMonth());
    let y = date.getFullYear();
    this.state = {
      date: date,
      month: m,
      day: d,
      year: y,
      gestureName: "none",
    };
  }
  numtoMonth(m) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[m];
  }

  // onSwipeUp(gestureState) {
  //   this.setState({ myText: "You swiped up!" });
  // }

  // onSwipeDown(gestureState) {
  //   this.setState({ myText: "You swiped down!" });
  // }

  // onSwipeLeft(gestureState) {
  //   this.setState({ myText: "You swiped left!" });
  // }

  // onSwipeRight(gestureState) {
  //   this.setState({ myText: "You swiped right!" });
  // }
  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        // this.setState({ backgroundColor: "red" });
        break;
      case SWIPE_DOWN:
        // this.setState({ backgroundColor: "green" });
        break;
      case SWIPE_LEFT: //Goes to tomorrow
        let tomorrow = new Date(this.state.date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.setState({
          date: tomorrow,
          day: tomorrow.getDate(),
          month: this.numtoMonth(tomorrow.getMonth()),
          year: tomorrow.getFullYear(),
        });
        break;
      case SWIPE_RIGHT: //Goes to yesterday
        let yesterday = new Date(this.state.date);
        yesterday.setDate(yesterday.getDate() - 1);
        this.setState({
          date: yesterday,
          day: yesterday.getDate(),
          month: this.numtoMonth(yesterday.getMonth()),
          year: yesterday.getFullYear(),
        });
        break;
    }
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
    });
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        // onSwipeUp={(state) => this.onSwipeUp(state)}
        // onSwipeDown={(state) => this.onSwipeDown(state)}
        // onSwipeLeft={(state) => this.onSwipeLeft(state)}
        // onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
        }}
      >
        <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
        <Text style={styles.title}>
          {this.state.month} {this.state.day}, {this.state.year}
        </Text>
      </GestureRecognizer>
    );
  }
}

export default Calendar;
