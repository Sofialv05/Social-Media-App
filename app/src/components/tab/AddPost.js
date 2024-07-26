import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const AddPost = () => {
  return (
    <View>
      <Image style={styles.icon} source={require("../../assets/add-new.png")} />
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
export default AddPost;
