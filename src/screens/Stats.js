import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native";

class StatsScreen extends Component {
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
    getData = async () => {
      //get all keys
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        console.log(result);
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
      </View>
    );
  }
}

export default StatsScreen;
