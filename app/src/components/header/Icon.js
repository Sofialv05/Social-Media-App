import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

const Icon = () => {
  return (
    <View style={styles.icons}>
      <TouchableOpacity>
        <Image style={styles.like} source={require("../../assets/like.png")} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.message}
          source={require("../../assets/messager.png")}
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
    marginHorizontal: 20,
  },
  icons: {
    flexDirection: "row",
  },
  like: {
    width: 27,
    height: 27,
    marginLeft: 25,
    resizeMode: "contain",
    top: 1,
  },
  message: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginRight: 25,
    resizeMode: "contain",
    top: 2,
  },
});

export default Icon;
