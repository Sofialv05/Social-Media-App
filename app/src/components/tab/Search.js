import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Search = () => {
  return (
    <View>
      <Image style={styles.icon} source={require("../../assets/search.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 33,
    height: 33,
  },
});
export default Search;
