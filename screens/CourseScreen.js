import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import Toast from "react-native-simple-toast";
import moment from "moment";

import DatePicker from "../components/DatePicker";
import { VERIFY_APP } from "../util";

export default class CourseScreen extends Component {
  state = {
    place: "",
    openPicker: false,
    date: null,
    time: null,
    currentCourse: "",
    mode: "date",
  };
  componentDidMount() {
    this.getCurrentCourse();
  }

  getCurrentCourse = async () => {
    try {
      const course = await fetch(
        "https://www.osk-ekonomik.pl/api/get/getCourse.php",
        {
          method: "GET",
        }
      );
      const courseJSON = await course.json();
      this.setState({
        currentCourse: `Najbliższy termin rozpoczęcia kursu na prawo jazdy: ${courseJSON[0].data_kursu} r. o godz. ${courseJSON[0].godzina_kursu} w ${courseJSON[0].miejsce_kursu} `,
      });
    } catch (error) {}
  };

  updateCourse = async () => {
    let formData = new FormData();
    formData.append("verify", VERIFY_APP);
    formData.append("date", moment(this.state.date).format("DD-MM-YYYY"));
    formData.append("hour", moment(this.state.time).format("HH:mm"));
    this.state.place && formData.append("place", this.state.place);
    try {
      await fetch("https://www.osk-ekonomik.pl/api/post/postCourse.php", {
        method: "POST",
        body: formData,
      });
      Toast.show("Zapis udany", Toast.LONG);
      this.setState({ date: null,  place: "", time: null });
      this.getCurrentCourse();
    } catch (error) {
      Toast.show("Zapis nieudany", Toast.LONG);
    }
  };
  saveDateToState = (date) => {
    if(date === undefined) {
      this.setState({openPicker: false});
      return;
    }
    if (this.state.mode === "date") {
      this.setState({ date, mode: "time" });
    } else {
      this.setState({ time: date, mode: "date", openPicker: false });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.header}>Zmiana daty kursu</Text>
          <Text style={styles.headerSmall}>
            zmianie ulegną tylko uzupełnione pola
          </Text>
        </View>
        <View style={styles.box}>
          <View
            style={styles.input}
            onTouchEnd={() => this.setState({ mode: "date", openPicker: true })}
          >
            <Text
              style={[
                styles.inputText,
                ...(!this.state.date || !this.state.time ? [styles.gray] : []),
              ]}
            >
              {!this.state.date || !this.state.time
                ? "Data i godzina"
                : `${moment(this.state.date).format("DD-MM-YYYY")} ${moment(
                    this.state.time
                  ).format("HH:mm")}`}
            </Text>
          </View>
          {this.state.openPicker && (
            <DatePicker
              date={this.state.date || new Date()}
              mode={this.state.mode}
              onDateChange={this.saveDateToState}
            />
          )}
        </View>
        <View style={styles.box}>
          <TextInput
            value={this.props.place}
            onChangeText={(text) => this.setState({ place: text })}
            multiline={true}
            style={styles.input}
            placeholder="Miejsce kursu"
          />
        </View>
        <View style={styles.saveButton}>
          <Button
            onPress={this.updateCourse}
            title="Zapisz!"
            color="#0d2f54"
            style={styles.buttonText}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.currentBoldText}>Obecna data kursu:</Text>
          <Text style={styles.current}>{this.state.currentCourse}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentBoldText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  current: {
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  box: {
    backgroundColor: "#fff",
    margin: 10,
    alignSelf: "stretch",
    elevation: 3,
    paddingVertical: 30,
    borderRadius: 5,
  },
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontWeight: "600",
    fontSize: 30,
    textAlign: "center",
  },
  headerSmall: {
    fontSize: 12,
    textAlign: "center",
  },
  gray: {
    color: "rgba(0,0,0,0.5)",
  },
  input: {
    width: Dimensions.get("window").width - 60,
    fontSize: 22,
    textAlign: "center",
    borderBottomColor: "#0d2f54",
    borderBottomWidth: 3,
    paddingVertical: 5,
    alignSelf: "center",
  },
  inputText: {
    fontSize: 22,
    textAlign: "center",
    alignSelf: "center",
    color: "#000000",
  },
  saveButton: {
    width: Dimensions.get("window").width - 20,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    backgroundColor: "#0d2f54",
    color: "white",
    paddingVertical: 10,
    fontFamily: "Lato-black",
  },
});
