import { Image, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../assets/instagram.png")}
        />
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Image style={styles.like} source={require("../assets/like.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.message}
            source={require("../assets/messager.png")}
          />
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
  },
  icons: {
    flexDirection: "row",
  },
  like: {
    width: 25,
    height: 25,
    marginLeft: 25,
    resizeMode: "contain",
    top: 1,
  },
  message: {
    width: 23,
    height: 23,
    marginLeft: 20,
    marginRight: 10,
    resizeMode: "contain",
    top: 2,
  },
});

export default Header;
