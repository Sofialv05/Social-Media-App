import React, { useContext, useEffect, useState } from "react";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  Octicons,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import CreatePostScreen from "../screens/CreatePostScreen";
import UserProfile from "../screens/UserProfile";
import SearchScreen from "../screens/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Post from "../components/Home/Post";
import { AuthContext } from "../../contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import { FollowerScreen, FollowingScreen } from "../screens/FollowScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostDetailScreen from "../screens/PostDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
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
          tabBarIcon: ({ focused, color, size }) => {
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
          tabBarIcon: ({ focused, color, size }) => {
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
          tabBarIcon: () => null,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [fetchTokenLoading, setFetchTokenLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("accessToken").then((accessToken) => {
      if (accessToken) {
        setIsSignedIn(true);
      }

      setFetchTokenLoading(false);
    });
  });

  if (fetchTokenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Post"
              component={Post}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Followers"
              component={FollowerScreen}
              options={{
                headerTitle: SecureStore.getItem("username") + " followers",
              }}
            />
            <Stack.Screen
              name="Following"
              component={FollowingScreen}
              options={{
                headerTitle: SecureStore.getItem("username") + " following",
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={PostDetailScreen}
              options={{
                headerTitle: SecureStore.getItem("username") + " post detail",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
