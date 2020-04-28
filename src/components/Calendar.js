import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Add_Exercise from "./Add_Exercise";

class Calendar extends Component {
  constructor(props) {
    super(props);
    let date = this.props.suppliedDate;
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.gesture != this.props.gesture || prevProps != this.props) {
      if (this.props.gesture == "SWIPE_LEFT") {
        let tomorrow = new Date(this.state.date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.setState({
          date: tomorrow,
          day: tomorrow.getDate(),
          month: this.numtoMonth(tomorrow.getMonth()),
          year: tomorrow.getFullYear(),
        });
      } else if (this.props.gesture == "SWIPE_RIGHT") {
        let yesterday = new Date(this.state.date);
        yesterday.setDate(yesterday.getDate() - 1);
        this.setState({
          date: yesterday,
          day: yesterday.getDate(),
          month: this.numtoMonth(yesterday.getMonth()),
          year: yesterday.getFullYear(),
        });
      } //Pass back updated date to main app);
    }
  }
  render() {
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      },
    });

    return (
      // <GestureRecognizer
      //   onSwipe={(direction, state) => this.onSwipe(direction, state)}
      //   // onSwipeUp={(state) => this.onSwipeUp(state)}
      //   // onSwipeDown={(state) => this.onSwipeDown(state)}
      //   // onSwipeLeft={(state) => this.onSwipeLeft(state)}
      //   // onSwipeRight={(state) => this.onSwipeRight(state)}
      //   config={config}
      //   style={{
      //     flex: 1,
      //   }}
      // >
      <View>
        <Text style={styles.title}>
          {this.state.month} {this.state.day}, {this.state.year}
        </Text>
        <Add_Exercise date={this.state.date} />
      </View>
      // </GestureRecognizer>
    );
  }
}

export default Calendar;
