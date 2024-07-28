import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Octicons,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import CreatePostScreen from "../screens/CreatePostScreen";
import UserProfile from "../screens/UserProfile";
import SearchScreen from "../screens/SearchScreen";

import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export const MainTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <MaterialIcons name="home-filled" size={30} color="black" />
              );
            } else {
              return <Octicons name="home" size={24} color="black" />;
            }
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <FontAwesome name="search" size={24} color="black" />;
            } else {
              return <Feather name="search" size={24} color="black" />;
            }
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={CreatePostScreen}
        options={{
          headerTitle: "Create Post",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <MaterialIcons name="add-box" size={29} color="black" />;
            } else {
              return <Octicons name="diff-added" size={24} color="black" />;
            }
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={{ width: 27, height: 27 }}
              source={require("../assets/new-user.png")}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
