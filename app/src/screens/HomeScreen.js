import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/post";

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_POSTS);
  // console.log(data.findPosts[0]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stories />
        <View style={styles.posts}>
          {data.findPosts.map((post, index) => {
            return <Post post={post} key={index} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  posts: {
    marginVertical: 10,
  },
});
