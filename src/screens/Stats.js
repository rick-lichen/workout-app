import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
    });

    return (
      <View>
        <Text style={styles.title}>
          {this.state.month} {this.state.day}, {this.state.year}
        </Text>
        <Add_Exercise date={this.state.date} />
      </View>
    );
  }
}

export default Stats;
