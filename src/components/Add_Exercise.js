import React, { Component } from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import Dialog, { DialogContent, DialogButton } from "react-native-popup-dialog";
import Exercise from "./Exercise";

class Add_Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      exercises: [
        { name: "Push Ups", visible: false, reps: 0 },
        { name: "Sit Ups", visible: false, reps: 0 },
        { name: "Pull Ups", visible: false, reps: 0 },
        { name: "Squats", visible: false, reps: 0 },
      ],
    };
  }
  exercisePressed(name, index) {
    let temp = this.state.exercises;
    temp[index].visible = true; //Set visiblitiy of that exercise to be true
    this.setState({ exercises: temp }); //Set temp to be new exercises
  }
  componentDidUpdate(prevProps) {
    if (prevProps.date != this.props.date) {
      this.getCurrentDateData();
    }
  }
  componentDidMount() {
    this.getCurrentDateData();
  }
  getCurrentDateData = async () => {
    const existingLog = await AsyncStorage.getItem(
      String(this.props.date.getDate()) +
        String(this.props.date.getMonth()) +
        String(this.props.date.getFullYear())
    );
    let parsed = JSON.parse(existingLog);
    if (!parsed) {
      let temp = this.state.exercises;
      for (let i = 0; i < temp.length; i++) {
        //Resetting everything first
        temp[i].visible = false;
        temp[i].reps = 0;
      }
      this.setState({ exercises: temp });
    } else {
      let temp = this.state.exercises;
      for (let i = 0; i < temp.length; i++) {
        //Resetting everything first
        temp[i].visible = false;
        temp[i].reps = 0;
      }
      for (let j = 0; j < temp.length; j++) {
        for (let i = 0; i < parsed.length; i++) {
          if (parsed[i][0] == temp[j].name) {
            //if memory has the exercise
            temp[j].reps = parsed[i][1];
            temp[j].visible = true;
          }
        }
      }
      this.setState({ exercises: temp });
    }
  };
  render() {
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
      inputStyle: {
        borderWidth: 1,
        borderColor: "black",
      },
    });
    return (
      <View>
        <Button
          title="Add a Workout"
          onPress={() => this.setState({ adding: true })}
        />
        <Dialog
          visible={this.state.adding}
          onTouchOutside={() => this.setState({ adding: false })}
        >
          <DialogContent>
            {this.state.exercises.map((value, index) => {
              return (
                <Button
                  key={index}
                  title={value.name}
                  onPress={() => {
                    if (this.state.exercises[index].visible) {
                      alert("This exercise has already been added!");
                    } else {
                      let temp = this.state.exercises;
                      temp[index].visible = true; //Set visiblitiy of that exercise to be true
                      this.setState({ exercises: temp });
                    }
                    this.setState({ adding: false });
                  }} //Set temp to be new exercises}
                />
              );
            })}
          </DialogContent>
        </Dialog>
        {this.state.exercises.map((value, index) => {
          if (value.visible) {
            //render only if visible is true
            return (
              <Exercise
                key={index}
                name={value.name}
                date={this.props.date}
                reps={value.reps}
              />
            );
          }
        })}
      </View>
    );
  }
}

export default Add_Exercise;
