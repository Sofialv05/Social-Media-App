import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { StyleSheet, Text } from "react-native";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/post";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import HomeHeader from "../components/header/HomeHeader";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "95%"], []);
  const handleOpenSheet = () => bottomSheetRef.current?.snapToIndex(0);
  const renderBackDrop = useCallback((props) => (
    <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />
  ));

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
        <HomeHeader />
        <Stories />
        <View style={styles.posts}>
          <FlatList
            data={data.findPosts}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <Post
                post={item}
                key={index}
                navigation={navigation}
                handleOpenSheet={handleOpenSheet}
                t
              />
            )}
          />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          backdropComponent={renderBackDrop}
        >
          <View>
            <Text
              style={{ fontWeight: "600", fontSize: 20, alignSelf: "center" }}
            >
              Comments
            </Text>
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  posts: {
    marginVertical: 10,
  },
});
