import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native";

class StatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { summaryArray: [], daysWorkedOut: 0 };
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerRight: () => null,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white",
    },
  });

  render() {
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
    });
    getData = async () => {
      //get all keys
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        //Summing
        let sumArray = [];
        let exerciseArray = [];
        for (let i = 0; i < result.length; i++) {
          let parsed = JSON.parse(result[i][1]);
          for (let j in parsed) {
            let index = exerciseArray.indexOf(parsed[j][0]);
            if (index !== -1) {
              //If exercise already exists in exerciseArray, add the reps to the total count of sumArray
              sumArray[index][1] =
                Number(sumArray[index][1]) + Number(parsed[j][1]);
            } else {
              //Add exercise to exerciseArray
              exerciseArray.push(parsed[j][0]);
              sumArray.push([parsed[j][0], parsed[j][1]]);
            }
          }
        }
        console.log("sum: " + sumArray);
        this.setState({ summaryArray: sumArray });
      } catch (error) {
        console.error(error);
      }
    };
    clearData = async () => {
      //get all keys
      AsyncStorage.clear();
    };
    return (
      <View>
        <Text style={styles.title}> Overall Stats:</Text>
        <Button title="Get Data" onPress={getData} />
        <Button title="Clear All Data" onPress={clearData} />
        {this.state.summaryArray.map((value, index) => {
          return (
            <Text key={index}>
              {value[0]} : {value[1]}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default StatsScreen;
