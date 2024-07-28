import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Post from "../components/Home/Post";
import { AuthContext } from "../../contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, Image, View } from "react-native";
import { FollowerScreen, FollowingScreen } from "../screens/FollowScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import { MainTab } from "./MainTab";

const Stack = createNativeStackNavigator();

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
                headerTitle: "Post",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
