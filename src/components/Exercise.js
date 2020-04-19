import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NumericInput from "react-native-numeric-input";

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reps: 0,
      edit: false,
    };
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
          {this.props.name} : {this.state.reps}
        </Text>
        <Button title="Edit" onPress={() => this.setState({ edit: true })} />
        {this.state.edit ? (
          <View>
            <NumericInput
              value={this.state.reps}
              onChange={(reps) => this.setState({ reps })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="#B0228C"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor="#EA3788"
              leftButtonBackgroundColor="#E56B70"
            />
            <Button
              title="Done"
              onPress={() => this.setState({ edit: false })}
            ></Button>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}
export default Exercise;
