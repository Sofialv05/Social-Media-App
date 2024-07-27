import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const CommentList = ({ username, comment }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profile}
          source={require("../assets/new-user.png")}
        />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{username}</Text>
        <Text style={{ fontSize: 14 }}>{comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    margin: 15,
  },
  profile: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
});

export default CommentList;
