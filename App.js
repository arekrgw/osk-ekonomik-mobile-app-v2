import React from "react";
import AppNavigator from "./navigator/index";
import * as Font from "expo-font";

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      Lato: require("./assets/fonts/Lato-Regular.ttf"),
      "Lato-black": require("./assets/fonts/Lato-Black.ttf"),
      "Lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    });
  }
  render() {
    return <AppNavigator />;
  }
}
