import { View, StyleSheet, FlatList } from "react-native";
import React from "react";

import UserList from "./UserList";

const FollowList = ({ follows, navigation, route }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={follows}
        keyExtractor={(item) => item.id}
        renderItem={({ index, item }) => (
          <UserList
            key={index}
            userId={item.follower?._id || item.following?._id}
            name={item.follower?.name || item.following?.name}
            username={item.follower?.username || item.following?.username}
            navigation={navigation}
            route={route}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
});

export default FollowList;
