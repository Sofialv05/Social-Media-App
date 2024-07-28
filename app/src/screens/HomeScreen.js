import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet, Text } from "react-native";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST_ID, GET_POSTS } from "../queries/post";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import HomeHeader from "../components/header/HomeHeader";
import { Divider } from "react-native-elements";
import { GlobalStateContext } from "../../contexts/GlobalContext";
import CommentList from "../components/CommentList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ADD_COMMENT } from "../../mutations/post";

export default function HomeScreen({ navigation }) {
  const { postId, setPostId } = useContext(GlobalStateContext);
  const [comment, setComment] = useState("");
  const { loading, error, data } = useQuery(GET_POSTS);
  const [
    commentFn,
    { data: dataComment, error: errorComment, loading: Comment },
  ] = useMutation(ADD_COMMENT);

  const {
    loading: loadingPost,
    error: errorPost,
    data: dataPost,
    refetch,
  } = useQuery(GET_POST_ID, {
    variables: {
      postId,
    },
  });
  /* Bottom Sheet */
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "95%"], []);
  const handleOpenSheet = (id) => {
    setPostId(id);
    bottomSheetRef.current?.snapToIndex(0);
    // console.log(postId);
  };
  const renderBackDrop = useCallback((props) => (
    <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />
  ));
  /* Bottom Sheet */

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  const handleComment = async () => {
    await commentFn({
      variables: {
        inputComment: {
          postId,
          content: comment,
        },
      },
    });
    setComment("");
    refetch();
  };

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
              />
            )}
          />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackDrop}
        footerComponent={() => {}}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            Comments
          </Text>
          <Divider />
          {loadingPost ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <BottomSheetScrollView>
              <FlatList
                inverted
                data={dataPost?.findPostById.comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <CommentList
                    key={index}
                    username={item.username}
                    comment={item.content}
                  />
                )}
              />
            </BottomSheetScrollView>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={comment}
              onChangeText={(comment) => setComment(comment)}
            />
            <TouchableOpacity onPress={handleComment}>
              <MaterialCommunityIcons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
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
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "silver",
    borderTopWidth: 1,
    paddingHorizontal: 10,
  },
  input: {
    width: "90%",
    height: 50,
    paddingHorizontal: 20,
  },
});
