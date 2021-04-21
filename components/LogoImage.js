import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LogoImage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../img/brand-logo-small.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 253,
    paddingLeft: 10
  },
  img: {
    height: 30,
    width: 253
  }
});

export default LogoImage;
