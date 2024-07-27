import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const PostGrid = ({ postImages }) => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={postImages}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ index, item }) => (
          <TouchableOpacity>
            <ImagePosts key={index} imgUrl={item.imgUrl} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ImagePosts = ({ imgUrl }) => {
  return <Image style={styles.posts} source={{ uri: imgUrl }} />;
};

const styles = StyleSheet.create({
  posts: {
    width: 134,
    height: 138,
    margin: 1.5,
  },
});

export default PostGrid;
