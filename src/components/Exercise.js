import React, { Component } from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import NumericInput from "react-native-numeric-input";

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reps: this.props.reps,
      edit: false,
      date: this.props.date,
    };
  }
  _storeData = async () => {
    this.setState({ edit: false });
    //Retreive data first
    const existingLog = await AsyncStorage.getItem(
      String(this.state.date.getFullYear()) +
        "/" +
        String(this.state.date.getMonth() + 1) +
        "/" +
        String(this.state.date.getDate())
    );
    let newLog = JSON.parse(existingLog);
    if (!newLog) {
      newLog = [];
    } else {
      for (let i = 0; i < newLog.length; i++) {
        if (newLog[i][0] == this.props.name) {
          //If exercise is already stored in there, remove it
          newLog.splice(i, 1);
        }
      }
    }
    let exercise_log = [this.props.name, this.state.reps];
    newLog.push(exercise_log);
    try {
      await AsyncStorage.setItem(
        String(this.state.date.getFullYear()) +
          "/" +
          String(this.state.date.getMonth() + 1) +
          "/" +
          String(this.state.date.getDate()),
        JSON.stringify(newLog)
      );
    } catch (error) {
      // Error saving data
    }
  };
  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(
  //       String(this.state.date.getTime())
  //     );
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  componentDidUpdate(prevProps) {
    if (prevProps.date != this.props.date) {
      this.setState({ date: this.props.date }, () => {});
    }
    if (prevProps.reps != this.props.reps) {
      this.setState({ reps: this.props.reps });
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
              step={50}
              valueType="integer"
              minValue={0}
              maxValue={9999}
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
        {/* <Button title="Get stored values" onPress={this._retrieveData} /> */}
      </View>
    );
  }
}
export default Exercise;
