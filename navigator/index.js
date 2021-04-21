import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React from "react";

import CourseScreen from "../screens/CourseScreen";
import PricesScreen from "../screens/PricesScreen";

import LogoImage from "../components/LogoImage";

const headerStyleDefault = () => ({
  headerTitle: () => <LogoImage />,
  headerStyle: {
    backgroundColor: "#0d2f54"
  }
});

const CourseStack = createStackNavigator({
  CourseScreen: {
    screen: CourseScreen,
    navigationOptions: headerStyleDefault
  }
});

const PricesStack = createStackNavigator({
  PricesScreen: {
    screen: PricesScreen,
    navigationOptions: headerStyleDefault
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Kurs: CourseStack,
    Ceny: PricesStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Kurs")
          return (
            <Ionicons
              name="md-add-circle-outline"
              size={25}
              color={tintColor}
            />
          );
        else if (routeName === "Ceny")
          return <FontAwesome name="money" size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#0d2f54",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(TabNavigator);
