import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View>
      <Image
        style={styles.icon}
        source={require("../../assets/home-white.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
});

export default Home;
