import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BigCourseLetters = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.letter}>{props.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  letter: {
    fontFamily: "Lato-black",
    fontSize: 40,
    paddingTop: 42,
    paddingBottom: 42,
    color: "#0d2f54",
    letterSpacing: 0.1
  }
});

export default BigCourseLetters;
