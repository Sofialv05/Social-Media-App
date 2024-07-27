import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const UserList = ({ username, name, navigation, route, userId }) => {
  // console.log(userId);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Profile", { userId });
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.profile}
          source={require("../assets/new-user.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    marginVertical: 10,
  },
  profile: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  username: {
    fontWeight: "700",
    fontSize: 18,
  },
  name: {
    fontSize: 15,
  },
});

export default UserList;
