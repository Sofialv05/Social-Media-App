import { Image, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../assets/instagram.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: 130,
    height: 65,
    resizeMode: "contain",
  },
});

export default Logo;
