import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { NavigationEvents } from "react-navigation";

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

let visible = new Date();
let min = new Date(visible.getFullYear(), visible.getMonth(), 1);
let max = new Date(visible.getFullYear(), visible.getMonth() + 1, 0);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: visible,
      min: min,
      max: max,
      tappedDate: "",
      hasExercise: [],
      marked: null,
    };
  }
  getData = async () => {
    //clear everything before getting data
    this.setState({ hasExercise: [] });
    //get all keys
    try {
      const keys = await AsyncStorage.getAllKeys();
      // console.log("keys: " + keys);
      for (let i = 0; i < keys.length; i++) {
        let separate = keys[i].split("/"); //splits the year month day
        if (separate[1].length != 2) {
          //If month is single digit, at a zero in front of it
          separate[1] = "0" + separate[1];
        }
        if (separate[2].length != 2) {
          //If day is single digit, at a zero in front of it
          separate[2] = "0" + separate[2];
        }
        let together = separate.join("-"); //Join back together with dash
        this.setState({ hasExercise: [...this.state.hasExercise, together] });
      }
      let obj = this.state.hasExercise.reduce(
        (c, v) => Object.assign(c, { [v]: { marked: true, dotColor: "red" } }),
        {}
      );
      this.setState({ marked: obj }, () => console.log(this.state.marked));
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    this.getData();
    //Converts dates with exercises to object
  }

  render() {
    return (
      <View>
        <NavigationEvents onWillFocus={() => this.getData()} />
        <Calendar
          // Initially visible month. Default = Date()
          current={this.state.visible}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={this.state.min}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={this.state.max}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("selected day", day);
            let dayobj = new Date(day.timestamp);
            dayobj.setDate(dayobj.getDate() + 1);
            console.log("dayobj = " + dayobj);
            this.setState({ tappedDate: dayobj }, () => {
              this.props.navigation.navigate("Workout", {
                date: this.state.tappedDate,
                title: "Workout!",
              });
            });
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"MM yyyy"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(substractMonth) => {
            let newmin = new Date(
              this.state.min.getFullYear(),
              this.state.min.getMonth() - 1,
              1
            );
            let newmax = new Date(
              this.state.max.getFullYear(),
              this.state.max.getMonth(),
              0
            );
            this.setState({ min: newmin, max: newmax, visible: newmin });
          }}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => {
            let newmin = new Date(
              this.state.min.getFullYear(),
              this.state.min.getMonth() + 1,
              1
            );
            let newmax = new Date(
              this.state.max.getFullYear(),
              this.state.max.getMonth() + 2,
              0
            );
            this.setState({ min: newmin, max: newmax, visible: newmin });
          }}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          markedDates={this.state.marked}
          // {
          //   "2020-04-18": { marked: true, dotColor: "red", activeOpacity: 0 },
          // }}
        />
      </View>
    );
  }
}

export default HomeScreen;
