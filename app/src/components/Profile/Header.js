import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <View>
      <Text>Username</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    marginVertical: 10,
    right: 7,
    borderWidth: 3,
  },
  container: {
    marginLeft: 16,
    alignItems: "center",
  },
});

export default Header;
