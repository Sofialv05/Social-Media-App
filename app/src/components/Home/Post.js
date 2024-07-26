import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

const Post = () => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider orientation="vertical">
        <PostHeader />
      </Divider>
    </View>
  );
};

const PostHeader = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerUsername}>test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    alignItems: "center",
  },
  headerUsername: {
    fontSize: 18,
  },
});

export default Post;
