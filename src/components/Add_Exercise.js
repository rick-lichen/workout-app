import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Dialog, { DialogContent, DialogButton } from "react-native-popup-dialog";
import Exercise from "./Exercise";

class Add_Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      exercises: [
        { name: "Push Ups", visible: false },
        { name: "Sit Ups", visible: false },
        { name: "Pull Ups", visible: false },
        { name: "Squats", visible: false },
      ],
    };
  }
  exercisePressed(name, index) {
    let temp = this.state.exercises;
    temp[index].visible = true; //Set visiblitiy of that exercise to be true
    this.setState({ exercises: temp }); //Set temp to be new exercises
  }
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
                  }} //Set temp to be new exercises}
                />
              );
            })}
          </DialogContent>
        </Dialog>
        {this.state.exercises.map((value, index) => {
          if (value.visible) {
            //render only if visible is true
            return <Exercise key={index} name={value.name} />;
          }
        })}
      </View>
    );
  }
}

export default Add_Exercise;
