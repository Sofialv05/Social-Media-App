import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Icon = () => {
  return (
    <View style={styles.icons}>
      <TouchableOpacity>
        <AntDesign name="hearto" size={27} color="black" />
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
  message: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 25,
    resizeMode: "contain",
    bottom: 1,
  },
});

export default Icon;
