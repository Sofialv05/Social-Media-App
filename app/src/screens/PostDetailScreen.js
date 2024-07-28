import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {
  useContext,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST_ID } from "../queries/post";
import Post from "../components/Home/Post";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GlobalStateContext } from "../../contexts/GlobalContext";
import { ADD_COMMENT, LIKE_POST } from "../../mutations/post";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommentList from "../components/CommentList";

const PostDetailScreen = ({ route, navigation }) => {
  const { postId, setPostId } = useContext(GlobalStateContext);
  const [comment, setComment] = useState("");
  const { postId: id } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_POST_ID, {
    variables: {
      postId: id,
    },
  });
  const [
    commentFn,
    { data: dataComment, error: errorComment, loading: loadingComment },
  ] = useMutation(ADD_COMMENT);
  const [likeFn, { data: dataLike, error: errorLike, loading: loadingLike }] =
    useMutation(LIKE_POST);

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
    if (result) {
      refetch();
    }
  };

  const handleLike = async () => {
    const result = await likeFn({
      variables: {
        inputLike: {
          postId,
        },
      },
    });
    if (result) {
      refetch();
    }
  };

  //   console.log(postId);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.posts}>
          <Post
            post={data.findPostById}
            navigation={navigation}
            handleOpenSheet={handleOpenSheet}
            handleLike={handleLike}
          />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackDrop}
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
          {loading ? (
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
                data={data?.findPostById.comments}
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
};

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

export default PostDetailScreen;
