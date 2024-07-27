import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Logo from "./Logo";
import Icon from "./Icon";

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <Logo />
      <Icon />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
  },
});

export default HomeHeader;
