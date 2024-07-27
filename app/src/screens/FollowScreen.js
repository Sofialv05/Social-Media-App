import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWING } from "../queries/follow";
import { FlatList } from "react-native-gesture-handler";
import FollowList from "../components/FollowList";

export const FollowerScreen = ({ navigation, route }) => {
  const { loading, error, data } = useQuery(GET_FOLLOWERS);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  console.log(data);
  return (
    <FollowList
      follows={data.findAllFollowers}
      navigation={navigation}
      route={route}
    />
  );
};
export const FollowingScreen = ({ navigation, route }) => {
  const { loading, error, data } = useQuery(GET_FOLLOWING);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <FollowList
      follows={data.findAllFollowing}
      navigation={navigation}
      route={route}
    />
  );
};
