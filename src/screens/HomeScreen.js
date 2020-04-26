import React from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
  return (
    <View>
      <Button
        title="Workout!"
        onPress={() => props.navigation.navigate("Workout")}
      />
      <Button
        title="Stats!"
        onPress={() => props.navigation.navigate("Stats")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
