import React, { Component } from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import NumericInput from "react-native-numeric-input";

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reps: 0,
      edit: false,
      date: this.props.date,
    };
  }
  _storeData = async () => {
    this.setState({ edit: false });
    try {
      let exercise_log = [this.props.name, this.state.reps];
      console.log("this.state.date = " + this.state.date);
      await AsyncStorage.setItem(
        String(this.state.date.getTime()),
        JSON.stringify(exercise_log)
      );
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      console.log("retrieving data");
      const value = await AsyncStorage.getItem(
        String(this.state.date.getTime())
      );
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.date != this.props.date) {
      this.setState({ date: this.props.date }, () => {
        console.log(this.state.date);
      });
    }
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
            <Button title="Done" onPress={this._storeData} />
          </View>
        ) : (
          <Text></Text>
        )}
        <Button title="Get stored values" onPress={this._retrieveData} />
      </View>
    );
  }
}
export default Exercise;
