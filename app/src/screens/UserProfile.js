import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "react-native-elements";
import PostGrid from "../components/PostGrid";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { GET_USERLOGIN_PROFILE } from "../queries/user";
import client from "../config/apolloConnection";
import Toast from "react-native-toast-message";

const UserProfile = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_USERLOGIN_PROFILE);
  const { setIsSignedIn } = useContext(AuthContext);

  /* Bottom Sheet */
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["18%"], []);
  const handleOpenSheet = () => bottomSheetRef.current?.snapToIndex(0);
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

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("accessToken");

      setIsSignedIn(false);
      await client.resetStore();
      await client.cache.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Header
            username={data.findUserProfile.username}
            handleOpenSheet={handleOpenSheet}
          />
          <Profile
            posts={data.findPostByAuthorId}
            followers={data.findAllFollowers}
            following={data.findAllFollowing}
            navigation={navigation}
          />
          <ProfileInfo name={data.findUserProfile.name} />
        </SafeAreaView>
        <Divider width={1} />
        <PostGrid
          postImages={data.findPostByAuthorId}
          navigation={navigation}
        />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackDrop}
      >
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              margin: 40,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 20,
                alignSelf: "center",
                color: "white",
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

const Header = ({ handleOpenSheet, username }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOpenSheet}>
        <Ionicons name="person-sharp" size={24} color="black" />
      </TouchableOpacity>
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
          <TouchableOpacity>
            <Text
              style={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
            >
              {posts.length}
            </Text>
            <Text style={{ fontSize: 14 }}>posts</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <TouchableOpacity
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
          </TouchableOpacity>
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
    justifyContent: "space-between",
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

export default UserProfile;
