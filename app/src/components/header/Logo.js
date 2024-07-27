import { Image, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../assets/instafake.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: 120,
    height: 60,
    right: 8,
    resizeMode: "contain",
  },
});

export default Logo;
