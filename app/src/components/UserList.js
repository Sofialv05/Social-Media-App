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
      <View style={{ flex: 4, flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.profile}
          source={require("../assets/new-user.png")}
        />
        <View style={{ bottom: 6 }}>
          <Text style={{ fontWeight: "700", fontSize: 18 }}>{username}</Text>
          <Text style={{ fontSize: 15 }}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 60,
    height: 60,
    borderRadius: 25,
    borderWidth: 3,
    marginBottom: 10,
    marginRight: 20,
  },
});

export default UserList;
