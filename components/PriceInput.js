import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const PriceInput = props => {
  return (
    <View style={styles.container}>
      <Text>
        Cena kursu: (obecnie: <Text style={styles.bolder}>{props.price}zł</Text>
        )
      </Text>
      <TextInput
        onChangeText={text => props.handleInputs(text, props.slug, "price")}
        value={props.values.newPrice || ""}
        keyboardType="decimal-pad"
        style={[styles.input, { marginBottom: 5 }]}
      />
      <Text>
        Ilość godzin: (obecnie:{" "}
        <Text style={styles.bolder}>{props.hours}h</Text>)
      </Text>
      <TextInput
        onChangeText={text => props.handleInputs(text, props.slug, "hour")}
        value={props.values.newHours || ""}
        keyboardType="decimal-pad"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    fontFamily: "Lato",
    padding: 15,
    justifyContent: "center"
  },
  input: {
    fontSize: 20,
    borderBottomColor: "#0d2f54",
    borderBottomWidth: 2,
    paddingVertical: 5
  },
  bolder: {
    fontFamily: "Lato-bold"
  }
});

export default PriceInput;
