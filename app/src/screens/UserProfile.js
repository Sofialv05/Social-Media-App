import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "react-native-elements";
import PostGrid from "../components/PostGrid";

const UserProfile = () => {
  return (
    <View>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Header />
          <Profile />
          <ProfileInfo />
        </SafeAreaView>
        <Divider width={1} />
        <PostGrid />
      </ScrollView>
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Username</Text>
    </View>
  );
};

const Profile = () => {
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
          <Text style={{ fontSize: 18, fontWeight: "600" }}>10</Text>
          <Text style={{ fontSize: 14 }}>posts</Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>10</Text>
          <Text style={{ fontSize: 14 }}>followers</Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>10</Text>
          <Text style={{ fontSize: 14 }}>following</Text>
        </View>
      </View>
    </View>
  );
};

const ProfileInfo = () => {
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
    justifyContent: "center",

    top: 8,
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    marginVertical: 10,
  },
  info: {
    flex: 1,
    alignItems: "center",
    marginTop: 12,
  },
});

export default UserProfile;
