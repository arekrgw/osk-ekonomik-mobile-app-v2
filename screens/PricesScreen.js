import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Toast from "react-native-simple-toast";

import BigCourseLetter from "../components/BigCourseLetters";
import PriceInput from "../components/PriceInput";
import SaveButton from "../components/SaveButton";
import { VERIFY_APP } from "../util";

export default class PricesScreen extends Component {
  state = {
    allPrices: [],
    newPriceObj: {},
    showButton: false
  };

  getInitialPrices = async () => {
    try {
      const prices = await fetch(
        "https://www.osk-ekonomik.pl/api/get/getPrices.php",
        {
          method: "GET"
        }
      );
      const pricesJSON = await prices.json();
      this.setState({ allPrices: pricesJSON });
    } catch (e) {
      Toast.show("Nie udało się pobrać aktualnych cen :/", Toast.LONG);
    }
  };
  componentDidMount() {
    this.getInitialPrices();
  }

  constructRequest = () => {
    let bodyObj = new FormData();
    Object.keys(this.state.newPriceObj).map(key => {
      bodyObj.append(
        `cat-${key}`,
        `${this.state.newPriceObj[key].newPrice || "null"}${
          this.state.newPriceObj[key].newHours
            ? `+${this.state.newPriceObj[key].newHours}`
            : ""
        }`
      );
    });
    bodyObj.append("verify", VERIFY_APP);
    return bodyObj;
  };

  handleOnPress = async () => {
    try {
      await fetch("https://www.osk-ekonomik.pl/api/post/postPrices.php", {
        method: "POST",
        body: this.constructRequest()
      });
      Toast.show("Zapis udany!", Toast.LONG);
      this.setState({ newPriceObj: {} });
      this.getInitialPrices();
    } catch (error) {
      Toast.show("Wystąpił błąd w zapisie", Toast.LONG);
    }
  };

  handleInput = (e, slug, type) => {
    if (type === "price") {
      this.setState({
        newPriceObj: {
          ...this.state.newPriceObj,
          [slug]: { ...this.state.newPriceObj[slug], newPrice: e }
        }
      });
    } else if (type === "hour") {
      this.setState({
        newPriceObj: {
          ...this.state.newPriceObj,
          [slug]: { ...this.state.newPriceObj[slug], newHours: e }
        }
      });
    }
  };

  renderPrices = () => {
    return this.state.allPrices.map(item => {
      return (
        <View key={item.id_kursu} style={styles.priceContainer}>
          <BigCourseLetter category={item.nazwa} />
          <PriceInput
            handleInputs={this.handleInput}
            hours={item.ilosc_godz}
            price={item.cena}
            slug={item.slug}
            values={this.state.newPriceObj[item.slug] || {}}
          />
        </View>
      );
    });
  };

  checkIfNewObjIsEmpty = () => {
    let flag = false;
    if (Object.keys(this.state.newPriceObj).length === 0) {
      flag = false;
    } else {
      Object.keys(this.state.newPriceObj).map((key, index) => {
        if (this.state.newPriceObj[key].newPrice) {
          if (this.state.newPriceObj[key].newPrice == "") flag = false;
          else flag = true;
        }

        if (this.state.newPriceObj[key].newHours) {
          if (this.state.newPriceObj[key].newHours == "") flag = false;
          else flag = true;
        }
      });
      return flag && <SaveButton handleOnPress={this.handleOnPress} />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>{this.renderPrices()}</ScrollView>
        {this.checkIfNewObjIsEmpty()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    backgroundColor: "#fefefe",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderRadius: 5,
    elevation: 3
  },
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1
  }
});
