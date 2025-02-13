import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "react-native-elements";
import PostGrid from "../components/PostGrid";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../queries/user";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { FOLLOW_USER } from "../../mutations/follow";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [username, setUsername] = useState("");
  const [findFollow, setFindFollow] = useState(undefined);
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE, {
    variables: {
      userId: userId,
      followingUserId: userId,
      followerUserId: userId,
      PostUserId: userId,
    },
  });
  const [followFn, {}] = useMutation(FOLLOW_USER);

  const handleFollow = async () => {
    try {
      const result = await followFn({
        variables: {
          inputFollow: {
            followingId: userId,
          },
        },
      });
      if (result.data.followUser.message) {
        Toast.show({
          type: "success",
          text1: result.data.followUser.message,
          text1Style: {
            fontSize: 16,
            fontWeight: "500",
            color: "green",
          },
        });
      }
      refetch();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: error.message || error.toString(),
        text1Style: {
          fontSize: 16,
          fontWeight: "600",
          color: "red",
        },
      });
    }
  };

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await SecureStore.getItemAsync("username");
      setUsername(storedUsername);
    };

    getUsername();
  }, []);

  useEffect(() => {
    if (username && data && data.findAllFollowersById) {
      const follower = data.findAllFollowersById.find(
        (e) => e.follower.username === username
      );
      setFindFollow(follower);
    }
  }, [username, data]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>An Error Occured</Text>
    </View>;
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Header
            username={data.findUserById.username}
            navigation={navigation}
          />
          <Profile
            posts={data.findPostUser}
            followers={data.findAllFollowersById}
            following={data.findAllFollowingById}
            navigation={navigation}
          />
          <ProfileInfo name={data.findUserById.name} />
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {findFollow ? (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 30,
                borderWidth: 1,
              }}
            >
              <Text style={{ color: "black" }}>Followed</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleFollow}>
              <View
                style={{
                  backgroundColor: "black",
                  borderRadius: 5,
                  paddingVertical: 8,
                  paddingHorizontal: 30,
                }}
              >
                <Text style={{ color: "white" }}>Follow</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Divider width={1} />
        <PostGrid postImages={data.findPostUser} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const Header = ({ username, navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{username}</Text>
    </View>
  );
};

const Profile = ({ posts, followers, following, navigation }) => {
  return (
    <View style={{ flex: 9, flexDirection: "row" }}>
      <View style={{ flex: 2 }}>
        <Image
          style={styles.profile}
          source={require("../assets/new-user.png")}
        />
      </View>
      <View style={{ flex: 7, flexDirection: "row" }}>
        <View style={styles.info}>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
            >
              {posts.length}
            </Text>
            <Text style={{ fontSize: 14 }}>posts</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View
            onPress={() => {
              navigation.push("Followers");
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
            >
              {followers.length}
            </Text>
            <Text style={{ fontSize: 14 }}>followers</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View
            onPress={() => {
              navigation.push("Following");
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
            >
              {following.length}
            </Text>
            <Text style={{ fontSize: 14 }}>following</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileInfo = ({ name }) => {
  return (
    <View>
      <Text style={{ marginVertical: 3, fontSize: 14 }}>User's name</Text>
      <Text style={{ lineHeight: 22 }}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  header: {
    height: 70,
    gap: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
