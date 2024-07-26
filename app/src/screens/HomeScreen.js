import { SafeAreaView, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stories />
      <ScrollView>
        <Post />
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
});
