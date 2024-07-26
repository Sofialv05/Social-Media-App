import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

const Post = ({ post }) => {
  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <PostHeader username={post.author.username} />
      <View style={{ height: 400, width: "auto" }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: post.imgUrl }}
        />
      </View>

      <PostFooter
        username={post.author.username}
        likes={post.likes}
        content={post.content}
        comments={post.comments}
      />
      {console.log(post.comments)}
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

const PostFooter = ({ username, likes, content, comments, navigation }) => {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <View style={{ marginRight: 18 }}>
          <TouchableOpacity>
            <AntDesign name="hearto" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color="black"
              style={{ transform: [{ rotateY: "180deg" }] }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {likes.length !== 0 ? (
          <Text style={styles.headerUsername}>
            {likes.length > 1
              ? `${likes.length} likes`
              : `${likes.length} like`}
          </Text>
        ) : (
          ""
        )}
        <Text style={styles.headerUsername}>
          <Text style={{ ...styles.headerUsername, fontWeight: "500" }}>
            {username}
          </Text>{" "}
          {content}
        </Text>
      </View>
      <Comment comments={comments} />
    </View>
  );
};

const Comment = ({ comments, navigation }) => {
  {
    if (comments.length !== 0) {
      return (
        <View>
          <TouchableOpacity>
            <Text style={{ color: "gray" }}>
              {comments.length == 1
                ? `View ${comments.length} comment`
                : `View all ${comments.length} comments`}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
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
    fontSize: 16,
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
