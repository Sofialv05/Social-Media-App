import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const DATA = [
  {
    id: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    imgUrl:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const PostGrid = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={DATA}
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
