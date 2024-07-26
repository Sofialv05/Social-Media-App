import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader username={post.author.username} />

      <Image
        style={{ height: 500, width: 500 }}
        source={{ uri: post.imgUrl }}
      />
      <PostFooter />
    </View>
  );
};

const PostHeader = ({ username }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/new-user.png")}
        />
        <Text style={styles.headerUsername}>{username}</Text>
      </View>
    </View>
  );
};

const PostFooter = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity>
        <AntDesign name="hearto" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color="black"
          style={{ transform: [{ rotateY: "180deg" }] }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 8,
    alignItems: "center",
  },
  headerUsername: {
    fontSize: 18,
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginHorizontal: 8,
    borderWidth: 1.5,
  },
  text: {
    fontWeight: "700",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
});

export default Post;
