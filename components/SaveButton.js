import React from "react";
import { Button, View, StyleSheet } from "react-native";

const SaveButton = props => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => props.handleOnPress()}
        title="Zapisz!"
        color="#0d2f54"
        style={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 2
  },
  buttonText: {
    backgroundColor: "#0d2f54",
    color: "white",
    paddingVertical: 10,
    fontFamily: "Lato-black"
  },
  container: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    backgroundColor: "white"
  }
});

export default SaveButton;
